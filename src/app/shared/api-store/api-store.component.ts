import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service'

import { Store } from "@ngrx/store";
import * as fromRoot from "../../app-reducer";
import * as Cricket from "@store/cricket/cricket.actions";

@Component({
  selector: 'app-api-store',
  templateUrl: './api-store.component.html',
  styleUrls: ['./api-store.component.css']
})
export class ApiStoreComponent implements OnInit {

  constructor(private sportsService: SportsService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getMatchFixtures();
    this.getMatchResults();
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    // this.loadingFixture = true;
    this.sportsService.getmatchfixtures().subscribe((res: any) => {
      // this.loadingFixture = false;
      if (res.data)
        this.store.dispatch(new Cricket.CricketFixtures(res.data))
    }, (error) => {
      // this.loadingFixture = false;
    })
  }

  //get 3 days results -HOME
  getMatchResults() {
    // this.loadingResult = true;
    this.sportsService
      .getmatchresults()
      .subscribe((res: any) => {
        // this.loadingResult = false;
        if (res.data.length > 0) {
          //this.matchresults = res.data;
          res.data = res.data.map((data, matchIndex) => {
            let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
            let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
            if (data.period_scores) {
              data.period_scores.map((pscore, index) => {
                if (pscore.home_score) {
                  (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore)
                } else {
                  (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore)
                }
              })
            }
            return data;
          });
          this.store.dispatch(new Cricket.CricketResults(res.data))
        }
      }, (error) => {
        // this.loadingResult = false;
      });
  }

}
