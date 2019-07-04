import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-tournament-fixtures',
  templateUrl: './tournament-fixtures.component.html',
  styleUrls: ['./tournament-fixtures.component.css']
})
export class TournamentFixturesComponent implements OnInit {
 
  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;
  tournamentid;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private router: Router,
  ) {
    console.log("this.activatedroute.parent.snapshot")

   }

  ngOnInit() {
    console.log(this.activatedroute.parent.snapshot)
    this.tournamentid = this.activatedroute.parent.snapshot.params.id 
    this.getMatchFixtures();
  }



  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    if(this.matchfixtures && this.matchfixtures.length > 0 )
      return false;

    this.loadingFixture = true;
    this.sportsService.gettournamentfixtures(this.tournamentid).subscribe((res: any) => {
      this.loadingFixture = false;
      if (res.data)
        this.matchfixtures = res.data;
        this.matchfixtures = this.commonService.sortArr(this.matchfixtures, 'Do MMMM YYYY', 'scheduled', 'asc');
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
      .gettournamentresults(this.tournamentid)
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
      if(data.period_scores){
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
    this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled', 'desc');
    console.log('matchresults:last:', this.matchresults);    
  }

  // getTournamentFixtures() {
  //   this.loadingFixture = true;
  //   this.sportsService.gettournamentfixtures(this.tournamentid).subscribe(
  //     (res:any) => {
  //       this.loadingFixture = false;
  //       if (res["data"]) {
  //         this.fixtures = res["data"];
  //         this.fixtures = this.commonService.sortArr(this.fixtures, 'Do MMMM YYYY', 'scheduled')
  //       }
  //     },
  //     error => {
  //       this.loadingFixture = false;
  //       // if (error["error"].status == 400) {
  //       //   this.nofixturesdata = true;
  //       // }
  //     }
  //   );
  // }

  // //tournament results api call

  // getTournamentResults() {
  //   this.loadingResult = true;
  //   this.sportsService.gettournamentresults(this.tournamentid).subscribe(
  //     res => {
  //       this.loadingResult = false;
  //       if (res["data"]) {
  //         this.results = res["data"];
  //         this.results = this.results.map(data => {
  //           let obj = {};
  //           let team_arr = data["competitors"];
  //           team_arr.map(single => {
  //             obj[single.qualifier] = single;
  //           });
  //           let period_score_new = data["period_scores"];
  //           if (period_score_new) {
  //             period_score_new = period_score_new.map(singleb => {
  //               if (singleb.away_score !== undefined) {
  //                 return { ...singleb, team: obj["away"], teamFlag: true };
  //               } else {
  //                 return { ...singleb, team: obj["home"], teamFlag: false };
  //               }
  //             });
  //             return { ...data, period_score_new };
  //           } else {
  //             return data;
  //           }
  //         });
  //       }
  //       //sort matches result by date

  //       this.results = this.commonService.sortArr(this.results, 'Do MMMM YYYY', 'scheduled')
  //       console.log(this.results);
  //     },
  //     error => {
  //       this.loadingResult = false;
  //       // if (error["error"].status == 400) {
  //       //   this.noresultdata = true;
  //       // }
  //     }
  //   );
  // }

  //get match detail
  // matchDetail(id, team1, team2) {
  //   let teams = team1.concat("-", team2);
  //   this.router.navigate(["/cricket/match", btoa(id), teams]);
  // }


  //get 3 days results -HOME
  // getTournamentresults() {
  //   this.loadingResult = true;
  //   this.sportsService
  //     .gettournamentresults(this.tournamentid)
  //     .subscribe((res:any) => {
  //       this.loadingResult = false;

  //       if(res.data.length > 0){
  //         this.results = res.data;
  //         this.results = this.results.map((data, matchIndex) => {
  //           let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
  //           let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
  //           if(data.period_scores){
  //             data.period_scores.map((pscore, index) => {
  //               if(pscore.home_score){
  //                 (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore)
  //               }else{
  //                 (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore)
  //               }
  //             })      
  //           }
  //           return data; 
  //         });
  //         console.log('results:last:', this.results);
  //         this.results = this.commonService.sortArr(this.results, 'Do MMMM YYYY', 'scheduled');
  //         console.log('results:last:', this.results);
  //       }
  //     }, (error) => {
  //       this.loadingResult = false;
  //     });
  // }
}
