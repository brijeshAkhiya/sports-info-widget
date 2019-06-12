import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "../../../providers/sports-service";
import { SlugifyPipe } from "../../../pipes/slugpipe";
import { CommonService } from '@providers/common-service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: "app-cricket-home",
  templateUrl: "./cricket-home.component.html",
  styleUrls: ["./cricket-home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CricketHomeComponent implements OnInit {
  cricketseries: any;
  populartags: any;
  populararticles: any;
  latestposts: any;
  popularvideos: any;
  widget1title = "Current Series";
  widget1type = "currentseries";
  widget2title = "Popular Right Now";
  widget2type = "populartags";
  commonnewsparams: any
  commonnewstype: any
  commonvideoparams: { eSport: string; nLimit: number; eType: string; };
  commonlatestparams: any;
  constructor(private sportsService: SportsService, private router: Router, private title: Title, private meta: Meta,
    private slugifyPipe: SlugifyPipe,
    private commonService: CommonService) {
  }

  ngOnInit() {
    this.getPopularArticles();
    this.commonnewsparams = {
      eType: "",
      nLimit: 10,
      eSport: "Cricket",
    };
  }

  //get current cricket series

  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe(res => {
      if (res["data"]) {
        this.cricketseries = res["data"];
      }
    });
  }

  //get popular cricket tags

  getPopularTags() {
    let data = {
      eSport: "Cricket"
    };
    this.sportsService.getpopulartags(data).subscribe(res => {
      if (res["data"]) {
        this.populartags = res["data"];
      }
    });
  }

  //get popular posts

  getPopularArticles() {
    if (!this.populararticles) {
      this.populararticles = []
    }
    let data = {
      eSport: 'Cricket',
      nStart: this.populararticles.length,
      nLimit: 10
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.populararticles = this.populararticles.concat(res["data"]);
      }
    });
  }

  //loadmore popular 
  loadpopular() {
    let start = this.populararticles.length
    let data = {
      eSport: 'Cricket',
      nStart: start,
      nLimit: 10
    }
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        let array = []
        array = res["data"];
        this.populararticles = this.populararticles.concat(array)
      }
    });
  }

  //get recent posts

  getRecentPosts() {
    this.commonlatestparams = {
      eSport: 'Cricket',
      nLimit: 10,
      eSort: 'Latest'
    }
  }

  //get video posts

  getVideoPosts() {
    this.commonvideoparams = {
      eSport: 'Cricket',
      nLimit: 10,
      eType: 'Video'
    }
  }

  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id), slugname]);
  }

  //writer view 
  writerview(id) {
    this.router.navigate(['/writer', btoa(id)])
  }
}
