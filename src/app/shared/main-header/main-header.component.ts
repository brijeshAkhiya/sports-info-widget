import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { Router } from "@angular/router";
import { SlidesOutputData } from "ngx-owl-carousel-o";
import { AuthService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app-reducer";
import * as Auth from "../../store/auth/auth.actions";
import * as Ads from "../../store/ads-management/ads.actions";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SlugifyPipe } from "../../pipes/slugpipe";
import { SportsService } from "../../providers/sports-service";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"]
})
export class MainHeaderComponent implements OnInit {
  @ViewChild("navpointer") navpointer: ElementRef;
  @ViewChild("navbarnav") navbarnav: ElementRef;
  sliderdata = [];
  sliderresults = [];
  isapply: boolean = false;
  socialUser: any;
  issearch: boolean;
  searchkey: string;
  searchdata: any;
  noresults: boolean;
  isanylivematch: boolean;
  interval;
  sliderdata1: any;
  livedataarray = [];
  ismatchstart: boolean;
  logoplaceholder = '../../../assets/images/logo-placeholder.svg'
  constructor(
    private renderer2: Renderer2,
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
    private sportsService: SportsService,
    private modalService: NgbModal,
    private socialLoginService: AuthService,
    private store: Store<fromRoot.State>
  ) {
    //get custom ads data Funtion call --->
    this.getCustomAds();
  }

  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1
      },
      540: {
        items: 2
      },
      783: {
        items: 3
      },
      1150: {
        items: 4
      }
    },
    nav: true
  };

  ngOnInit() {
    this.getHeaderSliderData();
  }

  //get custom ads api call -Ngrx Store
  getCustomAds() {
    this.sportsService.getcustomadsbanner().subscribe(
      res => {
        if (res["data"]) {
          this.store.dispatch(new Ads.SaveAds(res["data"]));
        }
      },
      error => {
        this.getCustomAds();
      }
    );
  }

  //nav bar click event
  linkactive(linkid) {
    var navel = this.navbarnav.nativeElement;
    var navrect = navel.getBoundingClientRect();
    var el = document.getElementById(`nav-link${linkid}`); //get particular id nav-element
    var rect = el.getBoundingClientRect();
    var curPoint = rect["x"] - navrect["x"];
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      "width",
      rect.width + "px"
    ); //set
    this.renderer2.setStyle(
      this.navpointer.nativeElement,
      "left",
      curPoint + "px"
    );
  }

  //dynamic routing
  routing(routerlink) {
    if (routerlink) {
      this.router.navigate([`${routerlink}`]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  //get header slider data

  getHeaderSliderData() {
    this.sportsService.getheaderslider().subscribe(res => {
      if (res["data"]) {
        if (res["data"]) {
          res["data"].map(data => {
            if (
              data.slider_status == "upcoming" ||
              data.slider_status == "live"
            ) {
              this.sliderdata.push(data);
            }
          });
        }

        let newArray = [];
        newArray = this.sliderdata.map(sData => {
          if (sData.slider_status !== "results") {
            let compObj = {};
            sData.competitors.map(s => (compObj[s.qualifier] = s));
            if (sData.match_data) {
              sData.match_data.period_scores.map(sPScore => {
                if (sPScore.home_score) {
                  if (!compObj["home"].period_scores) {
                    compObj["home"].period_scores = [];
                  }
                  if (sPScore.number === 1) {
                    compObj["home"].show_first = true;
                  }
                  compObj["home"].period_scores.push(sPScore);
                } else if (sPScore.away_score) {
                  if (!compObj["away"].period_scores) {
                    compObj["away"].period_scores = [];
                  }
                  if (sPScore.number === 1) {
                    compObj["away"].show_first = true;
                  }
                  compObj["away"].period_scores.push(sPScore);
                }
              });
            }
            sData.competitors = compObj;
            return sData;
          } else {
            return sData;
          }
        });
        // newArray = newArray.sort((a, b) =>
        //   a.slider_status === "live" ? -1 : 0
        // );
        newArray = newArray.sort(function(a, b) {
          if (a.scheduled && b.scheduled) {
            let aDate: any = new Date(a.scheduled);
            let bDate: any = new Date(b.scheduled);
            return aDate - bDate;
          } else {
            return -1;
          }
        });
        console.log("array", newArray);
        this.sliderdata1 = newArray;

        this.isanylivematch = this.sliderdata1.some(
          type => type.slider_status === "live"
        );

        //check if any match is going to start in next 5 hours from current time
        this.ismatchstart = this.sliderdata1.some(data => {
          let matchtime: any = new Date(data.scheduled).getTime();
          let currenttime: any = new Date().getTime();
          let difference = Math.round(
            ((((matchtime - currenttime) / (1000 * 60 * 60)) % 24) * 100) / 100
          );
          if (difference <= 5 && difference >= 0) {
            return true;
          }
        });
        if (this.ismatchstart) {
          setTimeout(() => {
            this.getLiveUpdates();
          }, 30000);
        }
        if (this.isanylivematch == true) {
          this.interval = setInterval(() => {
            console.log("live update");
            this.getLiveUpdates();
          }, 7000);
        }
      }
    });
  }

  //get live match data slider - call every defined seconds of interval -->
  getLiveUpdates() {
    this.sportsService.getheaderslider().subscribe(res => {
      if (res["data"]) {
        let newArray = [];
        let dataarr = [];
        res["data"].map(data => {
          if (
            data.slider_status == "live" ||
            data.slider_status == "upcoming"
          ) {
            dataarr.push(data);
            dataarr.reverse();
          }
        });
        newArray = dataarr.map(sData => {
          if (
            sData.slider_status == "live" ||
            sData.slider_status == "upcoming"
          ) {
            let compObj = {};
            sData.competitors.map(s => (compObj[s.qualifier] = s));
            if (sData.match_data) {
              sData.match_data.period_scores.map(sPScore => {
                if (sPScore.home_score) {
                  if (!compObj["home"].period_scores) {
                    compObj["home"].period_scores = [];
                  }
                  if (sPScore.number === 1) {
                    compObj["home"].show_first = true;
                  }
                  compObj["home"].period_scores.push(sPScore);
                } else if (sPScore.away_score) {
                  if (!compObj["away"].period_scores) {
                    compObj["away"].period_scores = [];
                  }
                  if (sPScore.number === 1) {
                    compObj["away"].show_first = true;
                  }
                  compObj["away"].period_scores.push(sPScore);
                }
              });
            }
            sData.competitors = compObj;
            return sData;
          } else {
            return sData;
          }
        });
        // newArray = newArray.sort((a, b) =>
        //   a.slider_status === "live" ? -1 : 0
        // );
        newArray = newArray.sort(function(a, b) {
          if (a.scheduled && b.scheduled) {
            let aDate: any = new Date(a.scheduled);
            let bDate: any = new Date(b.scheduled);
            return aDate - bDate;
          } else {
            return -1;
          }
        });
        this.sliderdata1 = newArray;
      }
    });
  }

  //get match detail
  getmatchdetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }

  signInWithFB(): void {
    this.socialLoginService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(res => {
        if (res) {
          this.socialUser = res;
          this.store.dispatch(new Auth.SetAuthenticated());
        }
      });
  }

  signInWithGoogle(): void {
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialLoginService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        if (res) {
          this.store.dispatch(new Auth.SetAuthenticated());

          this.socialUser = res;
        }
      })
      .catch(error => {});
  }

  //Social login modal
  closeResult: string;
  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "signin-modal"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //search bar open
  searchopen() {
    this.isapply = false;
    if (!this.issearch) {
      this.issearch = true;
      this.renderer2.addClass(document.body, "search-box-open");
    } else {
      this.issearch = false;
      this.renderer2.removeClass(document.body, "search-box-open");
    }
  }

  //search close
  closesearch() {
    this.issearch = false;
    this.searchkey = "";
    this.renderer2.removeClass(document.body, "search-box-open");
  }

  //search api call
  search() {
    if (this.searchkey.trim()) {
      let data = {
        sSearch: this.searchkey,
        nLimit: 5,
        nStart: 0
      };
      this.searchdata = [];
      this.noresults = false;
      this.sportsService.getsearchresult(data).subscribe(res => {
        if (res["data"].length != 0) {
          this.searchdata = res["data"];
        } else {
          this.noresults = true;
        }
      });
    }
  }

  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id), slugname]);
    this.issearch = false;
    this.searchkey = "";
    this.searchdata = [];
    this.renderer2.removeClass(document.body, "search-box-open");
  }
}

//old logic for upper slider

// this.sliderdata.map((data) => {
//   if (data.slider_status == 'live') {
//     this.sliderresults.push(data);
//   }
//

//   if(data.slider_status == 'live' || data.slider_status == 'upcoming' ){
//     // interval(5000).subscribe((x)=>{
//     //   this.getHeaderSliderData();
//     // })
//   }
// })
// this.sliderresults = this.sliderresults.map(data => {
//   let obj = {};
//   let team_arr = data["competitors"]
//   team_arr.map(single => {
//     obj[single.qualifier] = single
//   })

//   let period_score_new = data["period_scores"]
//   if (period_score_new) {
//     period_score_new = period_score_new.map(singleb => {
//       if (singleb.away_score !== undefined) {
//         return { ...singleb, team: obj["away"], teamFlag: true }
//       } else {
//         return { ...singleb, team: obj["home"], teamFlag: false }
//       }
//     })
//     return { ...data, period_score_new }
//   }
//   else {
//     return data;
//   }
// })
