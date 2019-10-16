import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromRoot from '../../../app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import * as Basketball from '@store/basketball/basketball.actions';
import { appSelectors } from '@store/selectors/index';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [] } };
  loading = false;
  matchInfo;
  boxScoreParams = { loading: false };
  commentry: any = { loading: false, data: {} };
  boxData: any;
  interval;
  timeout;
  liveMatchSubscription;
  runningMatchFlagSubscription;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>
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

        if (['scheduled', 'created'].indexOf(this.matchInfo.status) > -1) {
          this.startLiveUpdateAfterTime();
        } else
          if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1)
            this.getLiveUpdate(this);

        this.matchInfo.venuedetails = this.matchInfo.venue;
        if (!this.matchInfo.venuedetails.lat || !this.matchInfo.venuedetails.lng) {
          this.sportsService.getReverseGeo(this.matchInfo.venuedetails.name + ',' + this.matchInfo.venuedetails.city + ',' + this.matchInfo.venuedetails.country).subscribe((geo: any) => {
            if (!geo.results) return false;
            this.matchInfo.venuedetails.lat = geo.results[0].geometry.location.lat;
            this.matchInfo.venuedetails.lng = geo.results[0].geometry.location.lng;
          });
        }
        this.getMatchBoxScore(id);
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
        if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1 && this.commentry.data.periods) {
          let periodIndex = this.commentry.data.periods.findIndex((period) => period.sequence == res.data.quarter);
          if (periodIndex > -1) {
            this.commentry.data.periods[periodIndex].events = res.data.periods[res.data.quarter - 1].events;
            this.matchInfo.periods[periodIndex].events = res.data.periods[res.data.quarter - 1].events;
            this.commentry.data.periods[periodIndex].home = res.data.periods[res.data.quarter - 1].home;
            this.matchInfo.periods[periodIndex].home = res.data.periods[res.data.quarter - 1].home;
            this.commentry.data.periods[periodIndex].away = res.data.periods[res.data.quarter - 1].away;
            this.matchInfo.periods[periodIndex].away = res.data.periods[res.data.quarter - 1].away;
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

    // this.boxScoreParams.loading = true;
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

  /**
   * Update Match live Data
   */
  updateBasketballData(match, key) {
    let venue = this.matchInfo.venuedetails;
    this.matchInfo = match[key];
    this.matchInfo.venuedetails = venue;
    this.matchInfo.periods = this.commentry.data.periods;
    if (['inprogress', 'halftime', 'delayed'].indexOf(this.matchInfo.status) > -1) {
      this.getMatchBoxScore(this.matchInfo.id);
      this.getMatchCommentry(this.matchInfo.id);
    }
    if (['closed', 'complete'].indexOf(this.matchInfo.status) > -1) {
      this.getMatchCommentry(this.matchInfo.id);
      this.clearTimeInterval();
    }
  }

  getLiveUpdate(classThis) {
    /** Subscribe for Live Match info */
    if (this.liveMatchSubscription) this.liveMatchSubscription.unsubscribe();
    this.liveMatchSubscription = this.store.select(appSelectors.getBasketballMatches).subscribe((match) => {
      if (Object.entries(match).length !== 0 && Object.keys(match).filter((id) => this.matchInfo.id == id).length > 0)
        this.updateBasketballData(match, Object.keys(match).filter((id) => this.matchInfo.id == id)[0]);
    });

    /** If Basketball live update is already started, No need to start interval for Live match Info */
    this.runningMatchFlagSubscription = this.store.select(appSelectors.getBasketballLiveIds).subscribe((matches) => {
      if (Object.entries(matches).length !== 0 && Object.keys(matches).filter((id) => this.matchInfo.id == id).length > 0) {
        console.log('live update started already');
      } else {
        /** Start interval to get Live data from API  */
        this.interval = setInterval(() => {
          classThis.sportsService
            .getBasketballMatchSummary(this.matchInfo.id)
            .subscribe(res => {
              this.store.dispatch(new Basketball.SaveBasketballMatches(res.data));
            });
        }, classThis.commonService.miliseconds(0, 0, 20));
      }
    });
  }

  startLiveUpdateAfterTime() {
    let remainingTime = this.commonService.getRemainigTimeofMatch(
      moment.utc(this.matchInfo.scheduled).format()
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
    } else if (remainingMiliSec < 0)
      this.getLiveUpdate(this);
  }


  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    if (this.runningMatchFlagSubscription) this.runningMatchFlagSubscription.unsubscribe();
    if (this.liveMatchSubscription) this.liveMatchSubscription.unsubscribe();
    this.store.dispatch(new Basketball.RemoveBasketballUpdate());
  }

  ngOnDestroy() {
    this.clearTimeInterval();
  }
}
