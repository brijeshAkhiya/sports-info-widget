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
  // statsLoading: boolean = false;
  matchInfo;
  matchLineups;
  commentry = [];
  team:any = {};
  // venuedetails = { lat: '', lng: '', name: '' };
  // matchStats: any;
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
        if(this.matchLineups.lineups.length > 0)
          this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
    
  }


  initTeam() {
    // this.team.push(Object.assign({ 'qualifier': 'home' }, this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'home')[0] ));
    // this.team.push(Object.assign({ 'qualifier': 'away' }, this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'away')[0] ));
    this.team.home =  this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'home')[0];
    this.team.away = this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'away')[0];
    console.log(this.team);

  }

  initSquads() {

    
    // this.team.filter((comp) => comp.qualifier == 'home')[0].jersey = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].jersey;
    // this.team.filter((comp) => comp.qualifier == 'away')[0].jersey = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].jersey;
    this.team.home.jersey = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].jersey;
    this.team.away.jersey = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].jersey;

    // this.team.forEach((team, index) => {
    //   let tempArr;
    //   if(!this.matchLineups.lineups || this.matchLineups.lineups.length == 0)
    //     return false;
    //   if (team.qualifier == 'home')
    //     tempArr = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].players
    //   else
    //     tempArr = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].players
        
    //     this.team[index].players = [];
        
    //     this.team[index].squad = tempArr ? this.sorting(tempArr) : [];
    //     tempArr.forEach(element => {
    //       (this.team[index].players[element.type] = this.team[index].players[element.type] || []).push(element);
    //     });
    // });

    let tempHomeSquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].players
    this.team.home.squad = tempHomeSquad ? this.sorting(tempHomeSquad) : [];
    this.team.home.players = [];
    tempHomeSquad.forEach(element => {
      ( this.team.home.players[element.type] =  this.team.home.players[element.type] || []).push(element);
    });

    let tempAwaySquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].players
    this.team.away.squad = tempAwaySquad ? this.sorting(tempAwaySquad) : [];
    this.team.away.players = [];
    tempAwaySquad.forEach(element => {
      ( this.team.away.players[element.type] =  this.team.away.players[element.type] || []).push(element);
    });

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
}
