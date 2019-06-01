import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";
import { SportsService } from "../../providers/sports-service";
import { distinctUntilChanged } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { SlugifyPipe } from "../../pipes/slugpipe";
import { Store } from "@ngrx/store";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("videoele") videoele: ElementRef;
  @ViewChild("img") img: ElementRef;

  isPlayBtn: boolean = true;
  populararticles = [];
  popularvideos = [];
  recentposts = [];
  bannerposts: any;
  bannerimages = [];
  imageindex: number = 0;
  listindex: number = 0;
  populartags = [];
  matchresults: any;
  period_score: any;
  matchfixtures: any;
  commonnewsparams: any;
  customads: any;
  adsObj: {};
  ad: any;
  largeblogdefault = '../../../assets/images/placeholder_blog_large.svg'
  smallblogdefault = '../../../assets/images/placeholder_blog_small.svg'
  logoplaceholder = '../../../assets/images/logo-placeholder.svg'
  nofixturesdata: boolean;
  isnodata: boolean;

  constructor(
    private renderer2: Renderer2,
    private sportsService: SportsService,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
    private store: Store<any>
  ) {
    this.commonnewsparams = {
      nStart: 0,
      nLimit: 4
    };
  }

  ngOnInit() {
    this.getBannerPost();
    this.getPopularArticles();
    this.getPopularVideos();
    this.getMatchFixtures();
    this.getRecentPosts();
    this.getPopularTags();
  }

  //get banner posts

  getBannerPost() {
    this.sportsService.getbannerpost().subscribe(res => {
      if (res["data"]) {
        this.bannerposts = res["data"];
        this.bannerposts.map((data, i) => {
          this.bannerimages[i] = data.sImage;
        });
      }
    });
  }

  //get popular posts

  getPopularArticles() {
    let data = {
      eType: "Article",
      nLimit: 10
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.populararticles = res["data"];
      }
    });
  }

  //get popular videos

  getPopularVideos() {
    let data = {
      eType: "Video"
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.popularvideos = res["data"];
      }
    });
  }

  //get recent posts

  getRecentPosts() {
    let data = {
      eType: "",
      nLimit: 10
    };
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res["data"]) {
        this.recentposts = res["data"];
      }
    });
  }

  //get popular topics tags -

  getPopularTags() {
    let data = {
      eSport: ""
    };
    this.sportsService.getpopulartags(data).subscribe(res => {
      if (res["data"]) {
        this.populartags = res["data"];
      }
    });
  }

  //change image dynamically form list hover

  onmouseover(index) {
    this.imageindex = index; //dyanmic image index value
    this.listindex = index;
  }

  //get 3 days results -HOME

  getMatchResults() {
    this.sportsService
      .getmatchresults()
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        if (res["data"].length != 0) {
          this.matchresults = res["data"];
          this.isnodata = false
          //manipulate received data array
          this.matchresults = this.matchresults.map(data => {
            let obj = {};
            let team_arr = data["competitors"];
            team_arr.map(single => {
              obj[single.qualifier] = single;
            });

            let period_score_new = data["period_scores"];
            if (period_score_new) {
              period_score_new = period_score_new.map(singleb => {
                if (singleb.away_score !== undefined) {
                  return { ...singleb, team: obj["away"], teamFlag: true };
                } else {
                  return { ...singleb, team: obj["home"], teamFlag: false };
                }
              });
              return { ...data, period_score_new };
            } else {
              return data;
            }
          });
        } else {
          this.isnodata = true
          // this.getMatchResults();
        }
      },(error)=>{
        if(error){
          this.isnodata = true
        }
      });
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    this.sportsService.getmatchfixtures().subscribe(res => {
      if (res["data"]) {
        this.matchfixtures = res["data"];
        this.nofixturesdata = false
      }
    },(error)=>{
      if(error){
        this.nofixturesdata = true
      }
    });
  }

  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id), slugname]);
  }

  //get match detail
  matchDetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }

  //writer view 
  writerview(id){
    this.router.navigate(['/writer',btoa(id)])
  }
}
