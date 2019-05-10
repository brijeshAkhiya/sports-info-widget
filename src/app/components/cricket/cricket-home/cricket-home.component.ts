import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "../../../providers/sports-service";
import { SlugifyPipe } from "../../../pipes/slugpipe";
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
  constructor(private sportsService: SportsService,private router: Router,
    private slugifyPipe: SlugifyPipe) {}

  ngOnInit() {
    this.getPopularArticles();
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
    let data = {
      nLimit: 10
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.populararticles = res["data"];
      }
    });
  }

  //loadmore popular 

  loadpopular(){
    let start = this.populararticles.length
    let data = {
      nStart:start,
      nLimit:10
    } 
    this.sportsService.getpopularpost(data).subscribe(res =>{
      if (res["data"]) {
        let array = []
        array = res["data"];
        this.populararticles = this.populararticles.concat(array)
      }
    });
  }

  //get recent posts

  getRecentPosts() {
    let data = {
      eType: "",
      nLimit: 10,
      eSport: "Cricket"
    };
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res["data"]) {
        this.latestposts = res["data"];
      }
    });
  }

  //get video posts

  getVideoPosts() {
    let data = {
      nLimit: 10,
      eType: "Video"
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.popularvideos = res["data"];
      }
    });
  }




  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type, btoa(id),slugname]);
  }
}