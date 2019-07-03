import { Component, OnInit } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cricket-sidebar',
  templateUrl: './cricket-sidebar.component.html',
  styleUrls: ['./cricket-sidebar.component.css']
})
export class CricketSidebarComponent implements OnInit {

  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMatchFixtures();
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    this.loadingFixture = true;
    this.sportsService.getmatchfixtures().subscribe((res: any) => {
      this.loadingFixture = false;
      if (res.data)
        this.matchfixtures = res.data;
    }, (error) => {
      this.loadingFixture = false;
    });
  }

  //get 3 days results -HOME
  getMatchResults() {
    this.loadingResult = true;
    this.sportsService
      .getmatchresults()
      .subscribe((res: any) => {
        this.loadingResult = false;

        if (res.data.length > 0) {
          this.matchresults = res.data;
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
          console.log('matchresults:last:', this.matchresults);
        }
      }, (error) => {
        this.loadingResult = false;
      });
  }


  //get match detail
  matchDetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }



}
