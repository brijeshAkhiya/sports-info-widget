import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [] } };
  loading = false;
  matchInfo;
  boxScoreParams = { loading: false };
  commentry: any = { loading: false, data: {} };
  boxData: any;
  interval;
  timeout;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    let matchid = this.activatedroute.snapshot.params.id;
    this.getMatchInfo(matchid);
    this.paramArticle.reqParams.aIds.push(matchid);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getBasketballMatchSummary(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;


        if (this.matchInfo.status === 'scheduled') {
          this.startLiveUpdateAfterTime();
        } else
          if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1)
            this.getLiveUpdate(this);

        this.matchInfo.venuedetails = this.matchInfo.venue;
        this.sportsService.getReverseGeo(this.matchInfo.venuedetails.name + ',' + this.matchInfo.venuedetails.city + ',' + this.matchInfo.venuedetails.country).subscribe((geo: any) => {
          this.matchInfo.venuedetails.lat = geo.results[0].geometry.location.lat;
          this.matchInfo.venuedetails.lng = geo.results[0].geometry.location.lng;
        });
        this.getMatchBoxScore(id);
        // if (this.matchInfo.status == 'closed')
        this.getMatchCommentry(id);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchCommentry(id) {
    if (Object.entries(this.commentry.data).length === 0)
      this.commentry.loading = true;
    this.sportsService.getBasketballMatchPlayByPlay(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo.periods = this.commentry.data.periods;
        if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1 && this.commentry.data.periods) {
          let periodIndex = this.commentry.data.periods.findIndex((period) => period.sequence == res.data.quarter);
          if (periodIndex > -1) {
            this.commentry.data.periods[periodIndex].events = res.data.periods[res.data.quarter - 1].events;
            this.matchInfo.periods[periodIndex].events = res.data.periods[res.data.quarter - 1].events;
          } else {
            this.commentry.data.periods.push(res.data.periods[res.data.quarter - 1]);
            this.matchInfo.periods.push(res.data.periods[res.data.quarter - 1]);
          }
        } else
          this.matchInfo.periods = this.commentry.data.periods = res.data.periods;
      }
      this.commentry.loading = false;
    }, (error) => {
      this.commentry.loading = false;
    });
  }


  getMatchBoxScore(id) {
    // if (this.boxScoreParams.data.length > 0)
    //   return false;

    this.boxScoreParams.loading = true;
    this.sportsService.getBasketballMatchBoxScore(id).subscribe((res: any) => {
      this.boxScoreParams.loading = false;
      if (res.data) {
        this.boxData = res.data;
        let that = this;
        if (res.data.home.leaders) {
          Object.keys(res.data.home.leaders).forEach(function (key) {
            res.data.home.leaders[key].forEach(leader => {
              if (!that.boxData.home.squads) that.boxData.home.squads = [];
              leader.type = key;
              that.boxData.home.squads.push(leader);
            });
          });
        }
        if (res.data.away.leaders) {
          Object.keys(res.data.away.leaders).forEach(function (key) {
            res.data.away.leaders[key].forEach(leader => {
              if (!that.boxData.away.squads) that.boxData.away.squads = [];
              leader.type = key;
              that.boxData.away.squads.push(leader);
            });
          });
        }
      }
    }, (error) => {
      this.boxScoreParams.loading = false;
    });
  }

  getLiveUpdate(classThis) {
    this.interval = setInterval(() => {
      classThis.sportsService
        .getBasketballMatchSummary(this.matchInfo.id)
        .subscribe(res => {
          this.matchInfo = res.data;
          this.matchInfo.periods = this.commentry.data.periods;

          if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1) {
            // this.getMatchBoxScore(this.matchInfo.id);
            this.getMatchCommentry(this.matchInfo.id);
          }
          if (['closed', 'complete'].indexOf(this.matchInfo.status) > -1) {
            this.getMatchCommentry(this.matchInfo.id);
            this.clearTimeInterval();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, 8));
  }

  startLiveUpdateAfterTime() {

    let remainingTime = this.commonService.getRemainigTimeofMatch(
      this.matchInfo.scheduled
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
      }, remainingMiliSec);
    }
  }


  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    clearInterval(this.interval);
    // clearTimeout(this.timeout);
  }
}
