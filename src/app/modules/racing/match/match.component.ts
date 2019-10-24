import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnDestroy {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Racing', aIds: [] } };
  loading = false;
  matchInfo;
  commentry: any = { loading: false, data: {} };
  interval;
  timeout;
  game;


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

    let params: any = this.activatedroute.parent.params;
    this.game = params.value.game;

    let matchid = this.activatedroute.snapshot.params.id;
    this.paramArticle.reqParams.aIds.push(this.commonService.getIds(matchid, 'racing', 'stage'));
    this.getMatchInfo(this.commonService.getIds(matchid, 'racing', 'stage'));
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getRacingSeasonsSummary(this.game, id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data.stage;

        if (this.matchInfo.venue && (!this.matchInfo.venue.lat || !this.matchInfo.venue.lng)) {
          this.sportsService.getReverseGeo(this.matchInfo.venue.name + ',' + this.matchInfo.venue.city + ',' + this.matchInfo.venue.country).subscribe((geo: any) => {
            if (!geo.results) return false;
            this.matchInfo.venue.lat = geo.results[0].geometry.location.lat;
            this.matchInfo.venue.lng = geo.results[0].geometry.location.lng;
          });
        }
        if (this.matchInfo.status == 'Finished' && this.matchInfo.stages.length > 0)
          this.getStageData(this.matchInfo.stages[0].id);

      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getStageData(id) {
    this.commentry.loading = true;
    this.sportsService.getRacingSeasonsSummary(this.game, id).subscribe((res: any) => {
      if (res.data) {
        this.commentry.data[id] = res.data.stage.competitors;
      }
      this.commentry.loading = false;
    }, (error) => {
      this.commentry.loading = false;
    });
  }

  getLiveUpdate(classThis) {
    /** Start interval to get Live data from API  */
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      classThis.sportsService
        .getBadmintonMatchTimeline(classThis.matchInfo.sport_event.id)
        .subscribe(res => {
          classThis.matchInfo = res.data;
        });
    }, classThis.commonService.miliseconds(0, 0, 10));
  }

  startLiveUpdateAfterTime() {
    let remainingTime = this.commonService.getRemainigTimeofMatch(
      moment.utc(this.matchInfo.sport_event.start_time).format()
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
