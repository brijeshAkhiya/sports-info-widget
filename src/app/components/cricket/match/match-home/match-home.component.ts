import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../../providers/sports-service";
import * as moment from "moment";

@Component({
  selector: "app-match-home",
  templateUrl: "./match-home.component.html",
  styleUrls: ["./match-home.component.css"]
})
export class MatchHomeComponent implements OnInit {
  commonnewsparams = {};
  matchid: any;
  matchstatus: any;
  sportevent: any;
  hours: any;
  minutes: any;
  seconds: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService
  ) {
    this.matchid = atob(this.activatedroute.snapshot.params.id);
  }

  ngOnInit() {
    this.getMatchTimeline();
  }

  //get matchtimeline
  getMatchTimeline() {
    this.sportsService.getmatchtimeline(this.matchid).subscribe(res => {
      if (res["data"]) {
        console.log(res["data"]);
        this.matchstatus = res["data"]["sport_event_status"].status;
        this.sportevent = res["data"]["sport_event"];
        console.log(this.sportevent);

        if (this.matchstatus == "not_started") {
          let date = this.sportevent.scheduled;
          setInterval(() => {
            let enddate = new Date(date).getTime();
            let now = new Date().getTime();
            let time = enddate - now;
            if (time >= 0) {
              this.hours = Math.floor(
                (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              this.minutes = Math.floor(
                (time % (1000 * 60 * 60)) / (1000 * 60)
              );
              this.seconds = Math.floor((time % (1000 * 60)) / 1000);
            }
          }, 1000);
        } else if (this.matchstatus == "closed") {
        }
      }
    });
  }

  //get match probablities

  getMatchProbability() {
    this.sportsService.getmatchprobability(this.matchid).subscribe(res => {
      console.log(res["data"]);
    });
  }

  //get match related articles
  getarticles() {
    this.commonnewsparams = {
      eSport: "Cricket",
      aIds: [this.matchid]
    };
  }
}
