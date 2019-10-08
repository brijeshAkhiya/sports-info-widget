import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {
  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [] } };
  loading = false;
  statsLoading = false;
  matchInfo;
  commentry = [];
  team = [];
  objectKeys = Object.keys;
  venuedetails = { lat: '', lng: '', name: '' };
  matchStats: any;
  dummyAPICall = 62;
  interval;
  timeout;

  public lineChartDataHome: any = [
    { data: [-1], label: '' },
  ];
  public lineChartDataAway: any = [
    { data: [-1], label: '' },
  ];
  public lineChartLabelsHome: Label[] = ['Match Start'];
  public lineChartLabelsAway: Label[] = ['Match Start'];
  public lineChartOptionsHome: any = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          max: 5,
          min: -1,
          // reverse: true
        },
      }],
      xAxes: [{
        display: false
      }]
    },
    bezierCurve: false,
    tooltips: {
      borderWidth: 2,
      backgroundColor: '#fff',
      titleFontColor: '#292929',
      bodyFontColor: '#292929',
      borderColor: '#EBEBEB',
    }
  };
  public lineChartOptionsAway: any = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          max: 5,
          min: -1,
          reverse: true
        },
      }],
      xAxes: [{
        display: false
      }]
    },
    bezierCurve: false,
    tooltips: {
      borderWidth: 2,
      backgroundColor: '#fff',
      titleFontColor: '#292929',
      bodyFontColor: '#292929',
      borderColor: '#EBEBEB',
    }
  };
  public lineChartColorsHome: Color[] = [
    {
      borderColor: '#f2f2f2',
      backgroundColor: 'rgba(255,255,255,0.5)',
      pointBackgroundColor: '#FFF',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointBorderColor: '#ED1A33',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#ED1A33',

    },
  ];
  public lineChartColorsAway: Color[] = [
    {
      borderColor: '#f2f2f2',
      backgroundColor: 'rgba(255,255,255,0.5)',
      pointBackgroundColor: '#FFF',
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointBorderColor: '#22336F',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#22336F',

    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.getMatchInfo(this.activatedroute.snapshot.params.id);
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

        if (this.matchInfo.match_info.gamestate === 0) {
          this.startLiveUpdateAfterTime();
        } else if (this.matchInfo.match_info.status === 3)
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

  getLiveUpdate(classThis) {
    this.interval = setInterval(() => {
      /* TEMP */
      this.dummyAPICall++;
      classThis.sportsService
        .getMatchInfo(this.matchInfo.match_info.mid)
        // .getKabaddiDummyCall(this.dummyAPICall)
        .subscribe(res => {
          // let matchData = res.data.data.items;
          // this.matchInfo = res.data.data.items;
          let matchData = res.data.items;
          this.matchInfo = res.data.items;
          if (matchData.match_info.status === 3) {
            this.initTeam();
            this.initSquads();
            this.commentry = [];
            this.initCommentry();
          }
          if (matchData.match_info.status === 2) {
            this.commentry = [];
            this.initCommentry();
            this.clearTimeInterval();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, 8)); // TEMP

  }

  startLiveUpdateAfterTime() {

    let remainingTime = this.commonService.getRemainigTimeofMatch(
      this.matchInfo.match_info.datestart
    );

    let remainingMiliSec = this.commonService.miliseconds(
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
    remainingMiliSec =
      remainingMiliSec - this.commonService.miliseconds(0, 5, 0);
    if (remainingTime.days === 0 && remainingTime.hours < 5) {
      this.timeout = setTimeout(() => {
        this.getLiveUpdate(this);
        // }, 10);
      }, remainingMiliSec);
    }
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy() {
    this.clearTimeInterval();
  }

  getVenuedetails() {
    if (this.matchInfo.match_info.venue.location = ' ') {
      this.venuedetails.name = this.matchInfo.match_info.venue.name;
      this.sportsService.getReverseGeo(this.matchInfo.match_info.venue.name).subscribe((res: any) => {
        this.venuedetails.lat = res.results[0].geometry.location.lat;
        this.venuedetails.lng = res.results[0].geometry.location.lng;
      });
    } else {
      this.venuedetails.name = this.matchInfo.match_info.venue.name;
    }
  }
  initCommentry() {

    if (!(this.matchInfo.event && this.matchInfo.event !== ''))
      return false;
    let home = 0;
    let away = 0;
    // check if toss is already exists in commentry
    let existsToss = this.commentry.filter((commentry) => commentry.event_type === 'toss');
    if (existsToss.length === 0) {
      let temp: any = this.team.filter(team => team.tid === this.matchInfo.match_info.toss.winner);
      if (temp.length > 0)
        this.commentry.push({ event_type: 'toss', winner: temp[0].tname, decision: this.matchInfo.match_info.toss.decision });
    }

    this.matchInfo.event.forEach(event => {
      // let temp = this.commentry.filter(commentry => commentry.event_time == event.event_time);
      // if(temp.length == 0)
      this.commentry.push(event);
      if (event.point_home) {
        this.addTeamPoint(this.matchInfo.match_info.teams.home, event, event.point_home, 'home');
      }
      if (event.point_away) {
        this.addTeamPoint(this.matchInfo.match_info.teams.away, event, event.point_away, 'away');
      }
    });
    if (this.matchInfo.event.length > 0) {
      this.lineChartDataHome[0].data.push(-1);
      this.lineChartLabelsHome.push('Match End');
      this.lineChartDataAway[0].data.push(-1);
      this.lineChartLabelsAway.push('Match End');
    }

    // this.commentry = this.commentry.concat(this.matchInfo.event);
    this.commentry.forEach((match, index) => {
      this.commentry[index].point_home_plus = (home += (match.point_home ? match.point_home : 0));
      this.commentry[index].point_away_plus = (away += (match.point_away ? match.point_away : 0));
    });
    if (this.matchInfo.match_info.result.text !== '')
      this.commentry.push({ event_type: 'result', result: this.matchInfo.match_info.result.text });
  }

  addTeamPoint(team, event, point, abbr) {
    let desc;
    if ((event.raid_event === 'successful' || event.raid_event == 'technical') && team.tid == event.raiding_team_id) {
      desc = event.event_time + ' ' + event.raider_name;
    }
    if ((event.tackle_event === 'successful' || event.tackle_event == 'technical') && team.tid == event.defending_team_id) {
      desc = event.event_time + ' ' + event.defender_name;
    }
    if (event.bounus != '') {
      if (event.bounus == 'raider' && team.tid == event.raiding_team_id)
        desc = event.event_time + ' ' + event.raider_name;
      else if (event.bounus == 'defender' && team.tid == event.defending_team_id)
        desc = event.event_time + ' ' + event.defender_name;
    }

    if (desc) {
      if (abbr == 'home') {
        this.lineChartDataHome[0].data.push(point);
        this.lineChartLabelsHome.push(desc);
      } else {
        this.lineChartDataAway[0].data.push(point);
        this.lineChartLabelsAway.push(desc);
      }
    }
  }


  initTeam() {
    this.team.push(Object.assign({ 'qualifier': 'home' }, this.matchInfo.match_info.teams.home));
    this.team.push(Object.assign({ 'qualifier': 'away' }, this.matchInfo.match_info.teams.away));
  }

  initSquads() {
    this.team.forEach((team, index) => {
      let tempArr;
      if (team.qualifier === 'home')
        tempArr = this.matchInfo.squad.home;
      else
        tempArr = this.matchInfo.squad.away;
      this.team[index].players = [];

      this.team[index].squad = this.matchInfo.lineup && this.matchInfo.lineup[team.qualifier] ?
        this.sorting(this.matchInfo.lineup[team.qualifier].starting7) : [];
      tempArr.forEach(element => {
        (this.team[index].players[element.role] = this.team[index].players[element.role] || []).push(element);
      });
    });

  }

  sorting(arr) {
    return arr;
    return arr.sort(function (a, b) {
      if (a.role === 'raider')
        return -1;
      else if (a.role === 'allrounder')
        return 0;
      else
        return 1;
    });
  }


}
