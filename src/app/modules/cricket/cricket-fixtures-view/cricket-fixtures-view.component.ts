import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SportsService } from "@providers/sports-service"
import { CommonService } from "@providers/common-service";
import { CricketService } from "@providers/cricket-service";

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
    private cricketService: CricketService,
    private activatedroute: ActivatedRoute,
  ) {}

  ngOnInit() {
    let fromtype = this.activatedroute.snapshot.params.type;
    if (fromtype == "fixtures") {
      this.selectedTab = "upcoming";
      if(window.history.state.data){
        this.matchfixtures = this.commonService.sortArr(window.history.state.data, 'Do MMMM YYYY', 'scheduled', 'asc');
      }
      else
        this.getMatchFixtures();

    } else if (fromtype == "results") {
      this.selectedTab = "results";
      if(window.history.state.data){
        this.matchresults = this.commonService.sortArr(window.history.state.data, 'Do MMMM YYYY', 'scheduled', 'desc');
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
        this.matchfixtures = this.commonService.sortArr(res.data, 'Do MMMM YYYY', 'scheduled', 'asc');
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
           this.matchresults =this.cricketService.initCompetitorScore(res.data)
           this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled', 'desc');
        }
      }, (error) => {
        this.loadingResult = false;
      });
  }
}
