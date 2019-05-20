import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { distinctUntilChanged } from "rxjs/operators";
import { SlugifyPipe } from "../../../pipes/slugpipe";
import { SportsService } from "../../../providers/sports-service";
import * as moment from 'moment';


@Component({
  selector: 'app-cricket-fixtures-view',
  templateUrl: './cricket-fixtures-view.component.html',
  styleUrls: ['./cricket-fixtures-view.component.css']
})
export class CricketFixturesViewComponent implements OnInit {
  matchresults: any;
  matchfixtures: any;
  fixturesdata: { day: string; data: any; }[];
  finalresultsdata: { day: string; data: any; }[];
  noresultdata: boolean = false;
  constructor(
    private sportsService: SportsService,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
  ) { }

  ngOnInit() {
    this.getMatchFixtures();
  }

  //get 3 days results -HOME

  getMatchResults() {
    this.sportsService
      .getmatchresults()
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        if (res["data"].length != 0) {
          this.matchresults = res["data"];
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
        } 
        else{
          this.noresultdata = true
        }
           //sort matches result by date
      let dateObj1 = {}    
      if(res['data'].length != 0){
        this.matchresults.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          if (!dateObj1[mdate]) {
            dateObj1[mdate] = []
          }
        })
        this.matchresults.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          dateObj1[mdate].push(data)
        })
        this.finalresultsdata = Object.keys(dateObj1).map(day => ({ day, data: dateObj1[day] }))
      }
      },(error)=>{
        if(error['error'].status == 400){
          this.noresultdata = true
        }
      });
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    this.sportsService.getmatchfixtures().subscribe(res => {
      if (res["data"]) {
        this.matchfixtures = res["data"];
        console.log(this.matchfixtures);
        this.matchfixtures = res['data']
        let dateObj = {}
        this.matchfixtures.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          if (!dateObj[mdate]) {
            dateObj[mdate] = []
          }
        })
        this.matchfixtures.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          dateObj[mdate].push(data)
        })
        this.fixturesdata = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
      }
    });
  }

  //get match detail
  matchDetail(id,team1,team2){
    let teams =  team1.concat('-',team2)  
    this.router.navigate(['/cricket/match',btoa(id),teams])
  }


}
