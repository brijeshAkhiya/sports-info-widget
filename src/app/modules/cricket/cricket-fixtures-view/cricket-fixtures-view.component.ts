import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SportsService } from "@providers/sports-service"
import { CommonService } from "@providers/common-service";

@Component({
  selector: "app-cricket-fixtures-view",
  templateUrl: "./cricket-fixtures-view.component.html",
  styleUrls: ["./cricket-fixtures-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CricketFixturesViewComponent implements OnInit {

  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;
  selectedTab;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private activatedroute: ActivatedRoute,
  ) {}

  ngOnInit() {
    let fromtype = this.activatedroute.snapshot.params.type;
    if (fromtype == "fixtures") {
      this.selectedTab = "upcoming";
      if(window.history.state.data){
        this.matchfixtures = window.history.state.data;
        this.matchfixtures = this.commonService.sortArr(this.matchfixtures, 'Do MMMM YYYY', 'scheduled');
      }
      else
        this.getMatchFixtures();

    } else if (fromtype == "results") {
      this.selectedTab = "results";
      if(window.history.state.data){
        this.matchresults = window.history.state.data;
        this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled');
      }
      else
        this.getMatchResults();
    }
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    if(this.matchfixtures && this.matchfixtures.length > 0 )
      return false;

    this.loadingFixture = true;
    this.sportsService.getmatchfixtures().subscribe((res: any) => {
      this.loadingFixture = false;
      if (res.data)
        this.matchfixtures = res.data;
        this.matchfixtures = this.commonService.sortArr(this.matchfixtures, 'Do MMMM YYYY', 'scheduled');
    }, (error) => {
      this.loadingFixture = false;
    });
  }

  //get 3 days results -HOME
  getMatchResults() {
    if(this.matchresults && this.matchresults.length > 0 )
      return false;

    this.loadingResult = true;
    this.sportsService
      .getmatchresults()
      .subscribe((res: any) => {
        this.loadingResult = false;
        if (res.data){
          this.matchresults = res.data;
          this.initScore();
        }
      }, (error) => {
        this.loadingResult = false;
      });
  }
  
  initScore(){
    this.matchresults = this.matchresults.map((data, matchIndex) => {
      let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
      let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
      data.period_scores.map((pscore, index) => {
        if (pscore.home_score) {
          (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore)
        } else {
          (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore)
        }
      })
      return data;
    });
    this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled');
    console.log('matchresults:last:', this.matchresults);    
  }
  
}
