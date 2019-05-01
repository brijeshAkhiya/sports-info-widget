import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.css']
})
export class TeamsHomeComponent implements OnInit {
  commonnewsparams = {}
  teamid: any;
  tournamentid: any;
  fixturesdata: any;
  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute) {
    this.tournamentid = atob(this.activatedroute.snapshot.params.tournamentid)
    this.teamid = atob(this.activatedroute.snapshot.params.teamid)
  }

  ngOnInit() {
  }

  //get team fixtures
  getTeamFixtures() {
    this.sportsService.getteamfixtures(this.teamid).subscribe((res) => {
      if (res['data']) {
        let dataarray = []
        dataarray = res['data'].schedule
        let dateObj = {}
        dataarray.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          if (!dateObj[mdate]) {
            dateObj[mdate] = []
          }
        })
        dataarray.map((data) => {
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          dateObj[mdate].push(data)
        })
        this.fixturesdata = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
        
      }
    })
  }

  getarticles() {
    this.commonnewsparams = {
      eSport: 'Cricket',
      aIds: [this.teamid]
    }
  }

}
