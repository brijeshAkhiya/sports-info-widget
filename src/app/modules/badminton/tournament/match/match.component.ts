import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit, OnDestroy {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Badminton', aIds: [] } };
  loading = false;
  matchInfo;
  commentry: any = { loading: false, data: {} };
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
    this.paramArticle.reqParams.aIds.push(this.commonService.getIds(matchid, 'badminton', 'match'));
    this.getMatchInfo(this.commonService.getIds(matchid, 'badminton', 'match'));
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getBadmintonMatchTimeline(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;

        if (['not_started'].indexOf(this.matchInfo.sport_event_status.status) > -1) {
          this.startLiveUpdateAfterTime();
        } else
          if (['live'].indexOf(this.matchInfo.sport_event_status.status) > -1)
            this.getLiveUpdate(this);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getLiveUpdate(classThis) {
    /** Start interval to get Live data from API  */
    this.interval = setInterval(() => {
      classThis.sportsService
        .getBadmintonMatchTimeline(classThis.matchInfo.sport_event.id)
        .subscribe(res => {
          classThis.matchInfo = res.data;
        });
    }, classThis.commonService.miliseconds(0, 0, 15));
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
  }

  ngOnDestroy() {
    this.clearTimeInterval();
  }
}
