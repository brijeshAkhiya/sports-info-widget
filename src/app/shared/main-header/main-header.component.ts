import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "angularx-social-login";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from 'rxjs';

import { LoginModalComponent } from '../widget/login-modal/login-modal.component';

import * as fromRoot from "../../app-reducer";
import * as Auth from "../../store/auth/auth.actions";
import * as Ads from "../../store/ads-management/ads.actions";

import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"]
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild("navpointer") navpointer: ElementRef;
  @ViewChild("navbarnav") navbarnav: ElementRef;
  @ViewChild("navbarmenu") navbarmenu: ElementRef;
  @ViewChild('searchOpen') searchOpen;
  isapply: boolean = false;
  socialUser: any;
  issearch: boolean;
  // searchdata: any;
  noresults: boolean;
  interval;
  slider = [];
  timeout;
  isLogin: boolean;
  public windowinnerWidth: any;
  isopen: boolean = false;

  constructor(
    private renderer2: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sportsService: SportsService,
    private modalService: NgbModal,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private cricketService: CricketService,
    private commonService: CommonService,
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
      458: {
        items: 2
      },
      656: {
        items: 3
      },
      1046: {
        items: 4
      }
    },
    nav: true
  };

  ngOnInit() {
    this.getHeader();
    this.authService.authState.subscribe((user) => {
      console.log('checksocial', user);
      if (user == null) {
        this.isLogin = false
        this.store.dispatch(new Auth.SetUnauthenticated);
      }
      else {
        this.socialUser = user;
        this.isLogin = true
        this.store.dispatch(new Auth.SetAuthenticated);
      }
    });

    // this.innerWidth = window.innerWidth;
  }

  responsiveSticky(value) {
    if (window.pageYOffset > value) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.add('sticky-mainmenu');
    } else {
      let element = document.getElementById('navbar');
      element.classList.remove('sticky');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.remove('sticky-mainmenu');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.windowinnerWidth = window.innerWidth;
    if (this.windowinnerWidth < 576) {
      this.responsiveSticky(176);
      console.log("width change" + innerWidth);
    }
    else {
      this.responsiveSticky(129);
    }
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
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

  getHeader() {
    this.sportsService.getheaderslider().subscribe((res: any) => {

      this.slider = this.sortBySchedule(res.data);
      this.slider.forEach((match, index) => {

        let compObj = {};
        match.competitors.map(s => {
          compObj[s.qualifier] = s
          // if (s.qualifier == 'home')
          //   compObj[s.qualifier].show_first = true;
        });
        this.slider[index].competitors = compObj

        if (match.match_data && match.match_data.period_scores)
          this.setPeriodScore(match, index, match.match_data.period_scores)
        else if (match.period_scores)
          this.setPeriodScore(match, index, match.period_scores)
        else
          this.slider[index].competitors["home"].show_first = true;
      });

      let livematchcount = res.data.filter(match => match.status == "live" || match.status == "interrupted" || match.status == "delayed")
      if (livematchcount.length > 0)
        this.getLiveUpdateSlider(this);

      let upcomingMatchcount = res.data.filter(match => match.status == "not_started")
      if (upcomingMatchcount.length > 0) {
        let minTime = new Date(Math.min.apply(null, upcomingMatchcount.map(function (e) {
          return new Date(e.scheduled);
        })));
        this.startLiveUpdateAfterTime(minTime);
      }

    });
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime(scheduled) {
    let remainingTime = this.commonService.getRemainigTimeofMatch(scheduled);
    let remainingMiliSec = this.commonService.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds); remainingMiliSec =
      remainingMiliSec = remainingMiliSec - this.commonService.miliseconds(0, 10, 0);
    if (remainingTime.days == 0 && remainingTime.hours < 5) {
      console.log("remainingMiliSec", remainingMiliSec);
      this.timeout = setTimeout(() => {
        this.getLiveUpdateSlider(this)
      }, remainingMiliSec);
    }
  }

  setPeriodScore(match, index, period_scores) {
    // console.log("setPeriodScore");
    if (period_scores.length > 0) {
      period_scores.map(sPScore => {
        if (sPScore.home_score) {
          this.slider[index].competitors["home"].period_scores = sPScore;
          if (sPScore.number === 1) {
            this.slider[index].competitors["home"].show_first = true;
          }
        } else if (sPScore.away_score) {
          if (sPScore.number === 1) {
            this.slider[index].competitors["away"].show_first = true;
          }
          this.slider[index].competitors["away"].period_scores = sPScore;
        }
      });
    }
    // console.log(this.slider);

  }

  getLiveUpdateSlider(classThis) {
    this.interval = setInterval(() => {
      classThis.sportsService.getheaderslider().subscribe((res: any) => {
        // this.slider = this.sortBySchedule(res.data);   
        res.data.forEach((match, index) => {
          let indexSlider = this.slider.findIndex((slide) => slide.id == match.id);
          this.slider[indexSlider].status = match.status;
          if (match.match_data && match.match_data.period_scores) {
            this.setPeriodScore(match, indexSlider, match.match_data.period_scores)
          }
          else if (match.period_scores)
            this.setPeriodScore(match, indexSlider, match.period_scores)
          else
            this.slider[indexSlider].competitors["home"].show_first = true;

        });
      });
    }, classThis.commonService.miliseconds(0, 0, 8)); // TEMP 
  }


  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    console.log("clearTimeInterval");
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }


  sortBySchedule(arr) {
    return arr.sort(function (a, b) {
      if (a.status == 'live' || a.status == 'interrupted' || a.status == 'abandoned' || a.status == 'postponded' || a.status == 'delayed') {
        return -1
      }
      else if (a.status == 'not_started') {
        if (a.scheduled && b.scheduled) {
          let aDate: any = new Date(a.scheduled);
          let bDate: any = new Date(b.scheduled);
          return aDate - bDate;
        }
      }
      else {
        return 0;
      }
    });
  }

  close($event) {
    if (!$event) {
      this.issearch = false;
      this.renderer2.removeClass(document.body, "search-box-open");
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
  openmodal() {
    this.modalService.open(LoginModalComponent);
  }
  //search close
  closesearch() {
    this.issearch = false;
    // this.searchkey = "";
    this.renderer2.removeClass(document.body, "search-box-open");
  }

  getuserLogout(token) {
    this.sportsService.userlogout(token).subscribe((res) => {
      console.log(res);
      this.store.dispatch(new Auth.SetUnauthenticated());
    })
  }

  logout() {
    this.authService.signOut().then(res => {
      if (localStorage.getItem('userT')) {
        this.getuserLogout(localStorage.getItem('userT'));
        localStorage.removeItem('userT')
      }
    });
  }
}

