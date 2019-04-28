import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-tournament-fixtures',
  templateUrl: './tournament-fixtures.component.html',
  styleUrls: ['./tournament-fixtures.component.css']
})
export class TournamentFixturesComponent implements OnInit {
  tournamentid: any;
  fixturesdata: any;
  fixturesresult: any;
  tournamentresult: any;
  finalresultsdata: any;

  constructor(private activatedroute: ActivatedRoute, private sportsService: SportsService, ) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.parent.snapshot.params.id) //get parent route params
    this.getTournamentResults();
  }

  getTournamentFixtures() {
    this.sportsService.gettournamentfixtures(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.fixturesdata = res['data']
        let dateObj = {}
        this.fixturesdata.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          if (!dateObj[mdate]) {
            dateObj[mdate] = []
          }
        })
        this.fixturesdata.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          dateObj[mdate].push(data)
        })
        this.fixturesresult = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
      }
    })
  }

  //tournament results api call

  getTournamentResults() {
    this.sportsService.gettournamentresults(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.tournamentresult = res['data']
        this.tournamentresult = this.tournamentresult.map((data) => {
          let obj = {};
          let team_arr = data["competitors"]
          team_arr.map(single => {
            obj[single.qualifier] = single
          })
          let period_score_new = data["period_scores"]
          if (period_score_new) {
            period_score_new = period_score_new.map(singleb => {
              if (singleb.away_score !== undefined) {
                return { ...singleb, team: obj["away"], teamFlag: true }
              } else {
                return { ...singleb, team: obj["home"], teamFlag: false }
              }
            })
            return { ...data, period_score_new }
          }
          else {
            return data;
          }
        })
      }
      //sort matches result by date
      let dateObj = {}
      this.tournamentresult.map((data) => {
        let mdate = moment(data.scheduled).format('Do MMMM YYYY');
        if (!dateObj[mdate]) {
          dateObj[mdate] = []
        }
      })
      this.tournamentresult.map((data) => {
        let mdate = moment(data.scheduled).format('Do MMMM YYYY');
        dateObj[mdate].push(data)
      })
      this.finalresultsdata = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
    })
  }

}
