import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [] } }
  loading: boolean = false;
  matchInfo;
  commentry = [];
  team = [];
  objectKeys = Object.keys
  venuedetails = { lat: '', lng: '', name: '' };
  matchStats: any;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private activatedroute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getMatchInfo(this.activatedroute.snapshot.params.id)
    this.getMatchstats(this.activatedroute.snapshot.params.id)
    this.paramArticle.reqParams.aIds.push(this.activatedroute.snapshot.params.id);
  }

  getMatchstats(id) {
    this.sportsService.getMatchStats(id).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.matchStats = res.data.items;
      }
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getMatchInfo(id).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.matchInfo = res.data.items;
        this.getVenuedetails();
        this.initTeam();
        this.initCommentry();
        this.initSquads();
      }
    }, (error) => {
      this.loading = false;
    });
  }

  getVenuedetails() {
    if (this.matchInfo.match_info.venue.location = " ") {
      console.log('in venue');
      this.sportsService.getReverseGeo(this.matchInfo.match_info.venue.name).subscribe((res: any) => {
        this.venuedetails.lat = res.results[0].geometry.location.lat;
        this.venuedetails.lng = res.results[0].geometry.location.lng;
        this.venuedetails.name = this.matchInfo.match_info.venue.name
      })
    }
    else {
      console.log('not in venue');
      this.venuedetails.name = this.matchInfo.match_info.venue.name
    }
  }



  initCommentry() {
    if (!(this.matchInfo.event && this.matchInfo.event != ''))
      return false;
    let home = 0;
    let away = 0;
    let extraRun = { 'allout': 2, 'card': 1, 'super_raid': 1, 'super_tackle': 1 }

    let temp: any = this.team.filter(team => team.tid == this.matchInfo.match_info.toss.winner)
    this.commentry.push({ event_type: 'toss', winner: temp[0].tname, decision: this.matchInfo.match_info.toss.decision })

    this.commentry = this.commentry.concat(this.matchInfo.event);
    this.commentry.forEach((match, index) => {
      this.commentry[index].point_home_plus = (home += (match.point_home ? match.point_home : 0));
      this.commentry[index].point_away_plus = (away += (match.point_away ? match.point_away : 0));
      if (this.commentry[index].allout == "true") {
        if (match.bounus == '') {
          if (match.allout_team_id == this.matchInfo.match_info.teams.home.tid)
            this.commentry[index].point_away_plus = (away += extraRun.allout);
          else if (match.allout_team_id == this.matchInfo.match_info.teams.away.tid)
            this.commentry[index].point_home_plus = (home += extraRun.allout);
        }
      }
    });
    this.commentry.push({ event_type: 'result', result: this.matchInfo.match_info.result.text })

  }

  initTeam() {
    this.team.push(Object.assign({ 'qualifier': 'home' }, this.matchInfo.match_info.teams.home));
    this.team.push(Object.assign({ 'qualifier': 'away' }, this.matchInfo.match_info.teams.away));
    console.log(this.team);

  }

  initSquads() {
    this.team.forEach((team, index) => {
      let tempArr;
      if (team.qualifier == 'home')
        tempArr = this.matchInfo.squad.home;
      else
        tempArr = this.matchInfo.squad.away;
      this.team[index].players = [];
      tempArr.forEach(element => {
        (this.team[index].players[element.role] = this.team[index].players[element.role] || []).push(element);
      });
    })
    console.log(this.team);
  }
}
