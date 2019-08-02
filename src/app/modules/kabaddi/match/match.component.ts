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
  statsLoading: boolean = false;
  matchInfo;
  commentry = [];
  team = [];
  objectKeys = Object.keys
  venuedetails = { lat: '', lng: '', name: '' };
  matchStats: any;
  dummyAPICall = 62;
  interval;
  timeout;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.getMatchInfo(this.activatedroute.snapshot.params.id)
    // this.getMatchstats(this.activatedroute.snapshot.params.id)
    this.paramArticle.reqParams.aIds.push(this.activatedroute.snapshot.params.id);
  }

  getMatchstats(id) {
    this.statsLoading = true;
    this.sportsService.getMatchStats(id).subscribe((res: any) => {
      this.statsLoading = false;
      if (res.data) {
        this.matchStats = res.data.items;
      }
    }, (error) => {
      this.statsLoading = false;
    });
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getMatchInfo(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data.items;

        if (this.matchInfo.match_info.gamestate == 0) {
          this.startLiveUpdateAfterTime();
        }else if (this.matchInfo.match_info.status == 3)
          this.getLiveUpdate(this);

        this.getVenuedetails();
        this.initTeam();
        this.initCommentry();
        this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getLiveUpdate(classThis){
    console.log("getLiveUpdate");
    this.interval = setInterval(() => {
      //TEMP
      this.dummyAPICall++;
      classThis.sportsService
      .getMatchInfo(this.matchInfo.match_info.mid)
      // .getKabaddiDummyCall(this.dummyAPICall)
        .subscribe(res => {
          console.log(res); 
          // let matchData = res.data.data.items; 
          // this.matchInfo = res.data.data.items;
          let matchData = res.data.items; 
          this.matchInfo = res.data.items;
          if(matchData.match_info.status == 3){
            this.initTeam();
            this.initSquads();
            this.commentry = [];
            this.initCommentry();
          }
          if(matchData.match_info.status == 2){
            this.commentry = [];
            this.initCommentry();
            this.clearTimeInterval();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, 8)); // TEMP

  }


  startLiveUpdateAfterTime(){

    console.log("startLiveUpdateAfterTime");
    let remainingTime = this.commonService.getRemainigTimeofMatch(
      this.matchInfo.match_info.datestart
    );
    console.log(remainingTime);
    
    let remainingMiliSec = this.commonService.miliseconds(
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
    remainingMiliSec =
      remainingMiliSec - this.commonService.miliseconds(0, 5, 0); 
    if (remainingTime.days == 0 && remainingTime.hours < 5) {
      this.timeout = setTimeout(() => {
        this.getLiveUpdate(this);
      // }, 10);
    }, remainingMiliSec);
    }
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    console.log("clearTimeInterval");
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }

  getVenuedetails() {
    if (this.matchInfo.match_info.venue.location = " ") {
      this.sportsService.getReverseGeo(this.matchInfo.match_info.venue.name).subscribe((res: any) => {
        this.venuedetails.lat = res.results[0].geometry.location.lat;
        this.venuedetails.lng = res.results[0].geometry.location.lng;
        this.venuedetails.name = this.matchInfo.match_info.venue.name
      })
    }
    else {
      this.venuedetails.name = this.matchInfo.match_info.venue.name
    }
  }
  initCommentry() {
    console.log("initCommentry");
    
    if (!(this.matchInfo.event && this.matchInfo.event != ''))
      return false;
    let home = 0;
    let away = 0;
    // check if toss is already exists in commentry
    let existsToss = this.commentry.filter((commentry) => commentry.event_type == 'toss');
    if(existsToss.length == 0){
      let temp: any = this.team.filter(team => team.tid == this.matchInfo.match_info.toss.winner)
      this.commentry.push({ event_type: 'toss', winner: temp[0].tname, decision: this.matchInfo.match_info.toss.decision })
    }

    this.matchInfo.event.forEach(event => {
      // let temp = this.commentry.filter(commentry => commentry.event_time == event.event_time);
      // if(temp.length == 0)
        this.commentry.push(event);
    });

    // this.commentry = this.commentry.concat(this.matchInfo.event);
    this.commentry.forEach((match, index) => {
      this.commentry[index].point_home_plus = (home += (match.point_home ? match.point_home : 0));
      this.commentry[index].point_away_plus = (away += (match.point_away ? match.point_away : 0));
    });
    if(this.matchInfo.match_info.result.text != '')
      this.commentry.push({ event_type: 'result', result: this.matchInfo.match_info.result.text });
    console.log(this.commentry);
    

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
        
        this.team[index].squad = this.matchInfo.lineup && this.matchInfo.lineup[team.qualifier] ? this.sorting(this.matchInfo.lineup[team.qualifier].starting7) : [];
        tempArr.forEach(element => {
          (this.team[index].players[element.role] = this.team[index].players[element.role] || []).push(element);
        });
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
