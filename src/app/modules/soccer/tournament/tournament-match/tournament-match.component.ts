import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-tournament-match',
  templateUrl: './tournament-match.component.html',
  styleUrls: ['./tournament-match.component.css']
})
export class TournamentMatchComponent implements OnInit {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [] } }
  loading: boolean = false;
  statsLoading: boolean = false;
  matchInfo;
  matchLineups;
  commentry = [];
  team:any = {};
  // venuedetails = { lat: '', lng: '', name: '' };
  matchStats: any;
  // dummyAPICall = 62;
  // interval;
  // timeout;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private activatedroute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    let matchid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'soccer', 'match');
    this.getMatchInfo(matchid)
    // this.getMatchstats(this.activatedroute.snapshot.params.id)
    this.paramArticle.reqParams.aIds.push(matchid);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getSoccerMatchSummary(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;

        // if (this.matchInfo.match_info.gamestate == 0) {
        //   this.startLiveUpdateAfterTime();
        // }else if (this.matchInfo.match_info.status == 3)
        //   this.getLiveUpdate(this);

        // this.getVenuedetails();
        this.initTeam();
        this.getMatchLineup(this.matchInfo.sport_event.id)
        // this.initCommentry();
        // this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchLineup(id){
    console.log("getMatchLineup");
    this.loading = true;
    this.sportsService.getSoccerMatchLineup(id).subscribe((res: any) => {
      if (res.data) {
        this.matchLineups = res.data;
        console.log(this.matchLineups);
        
        // if (this.matchInfo.match_info.gamestate == 0) {
        //   this.startLiveUpdateAfterTime();
        // }else if (this.matchInfo.match_info.status == 3)
        //   this.getLiveUpdate(this);

        // this.getVenuedetails();
        // this.initTeam();
        // this.initCommentry();
        if(Object.entries(this.matchLineups.lineups).length > 0)
          this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
    
  }


  getMatchstats(id) {
    this.statsLoading = true;
    this.sportsService.getSoccerMatchTimeline(id).subscribe((res: any) => {
      this.statsLoading = false;
      if (res.data && res.data.statistics) {
        this.team.home.statistics = res.data.statistics.totals.competitors.filter((comp) => comp.qualifier == 'home')[0].statistics
        this.team.away.statistics = res.data.statistics.totals.competitors.filter((comp) => comp.qualifier == 'away')[0].statistics
        this.matchStats = res.data.statistics;
        console.log(this.team);
        
      }
    }, (error) => {
      this.statsLoading = false;
    });
  }

  initTeam() {
    this.team.home =  this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'home')[0];
    this.team.away = this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'away')[0];
    console.log(this.team);

  }

  initSquads() {

    this.team.home = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0];
    this.team.away = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0];

    //Team with role
    let tempHomeSquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].players;
    this.team.home.squad = []
    tempHomeSquad.forEach(element => {
      (this.team.home.squad[element.type] =  this.team.home.squad[element.type] || []).push(element);
    });
    //Team with formated type
    if(this.team.home.formation && this.team.home.formation.type){
      let players = this.sortingByRole(this.team.home.players);
      (this.team.home.formated_players =  this.team.home.formated_players || []).push(players.splice(0, 1));
      this.team.home.formation.type.split('-').forEach((formationType, index) => {
          this.team.home.formated_players.push(players.splice(0, formationType));
      });
    }

    //Team with role
    let tempAwaySquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].players;
    this.team.away.squad = []
    tempAwaySquad.forEach(element => {
      (this.team.away.squad[element.type] =  this.team.away.squad[element.type] || []).push(element);
    });
    //Team with formated type
    if(this.team.away.formation && this.team.away.formation.type){
      let players = window['players'] = this.sortingByRole(this.team.away.players);
      (this.team.away.formated_players =  this.team.away.formated_players || []).push(players.splice(0, 1));
      this.team.away.formation.type.split('-').forEach((formationType, index) => {
          this.team.away.formated_players.push(players.splice(0, formationType));
      });
    }

    console.log(this.team);

  }

  sorting(arr) {
    return arr;
    return arr.sort(function (a, b) {
      if (a.role == 'raider') 
        return -1;
      else if (a.role == 'allrounder') 
        return 0;
      else 
        return 1;
    });
  }

  sortingByRole(arr) {
    return arr.sort(function(a, b) { 
      return a.order - b.order;
    })
  }
}
