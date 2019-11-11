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

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Tennis', aIds: [] } };
  loading = false;
  lastmatches = [];
  nextmatches = [];
  probabilityOptions: any = {};
  matchInfo;
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
    let matchid = 'sr:match:' + this.activatedroute.snapshot.params.id;
    this.getMatchInfo(matchid);
    this.paramArticle.reqParams.aIds.push(matchid);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getTennisMatchSummary(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;
        this.getMatchHeadToHead();
        this.getMatchProbability(id);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchHeadToHead() {
    let getHeadToHead;
    if (this.matchInfo.sport_event.tournament.type == 'singles')
      getHeadToHead = this.sportsService.getTennisPlayerHeadToHead(this.matchInfo.sport_event.competitors[0].id, this.matchInfo.sport_event.competitors[1].id);
    else
      getHeadToHead = this.sportsService.getTennisTeamHeadToHead(this.matchInfo.sport_event.competitors[0].id, this.matchInfo.sport_event.competitors[1].id);

    getHeadToHead.subscribe((res: any) => {
      if (res.data) {
        if (res.data.last_meetings && res.data.last_meetings.results)
          this.lastmatches = this.commonService.sortArrByEvent(res.data.last_meetings.results.filter((match) =>
            match.sport_event_status.status == 'closed' || match.sport_event_status.status == 'cancelled'), 'Do MMMM YYYY', 'scheduled', 'asc');
        if (res.data.next_meetings && res.data.next_meetings.results)
          this.nextmatches = this.commonService.sortArrByEvent(res.data.next_meetings.results.filter((match) =>
            match.sport_event_status.status == 'not_started'), 'Do MMMM YYYY', 'scheduled', 'desc');
      }
    });
  }

  getMatchProbability(id) {
    let matchProbability;
    this.sportsService.getTennisMatchProbability(id).subscribe((res: any) => {
      if (res.data && res.data.probabilities && res.data.probabilities.markets.length > 0 && res.data.probabilities.markets[0].outcomes) {
        this.probabilityOptions.probability = matchProbability = this.matchInfo.sport_event.competitors;
        res.data.probabilities.markets[0].outcomes.forEach(element => {
          if (element.name == 'home_team_winner')
            matchProbability.filter(comp => comp.qualifier == 'home')[0].probability = element.probability;
          else
            matchProbability.filter(comp => comp.qualifier != 'home')[0].probability = element.probability;
        });

        if (matchProbability[0].probability > matchProbability[1].probability)
          this.probabilityOptions.stylePer = `${matchProbability[0].probability}%`;
        else
          this.probabilityOptions.stylePer = `${matchProbability[1].probability}%`;
      }
    });
  }

  getLiveUpdate(classThis) {
    this.interval = setInterval(() => {
      classThis.sportsService
        .getSoccerMatchTimeline(this.matchInfo.sport_event.id)
        .subscribe(res => {
          if (res.data.sport_event_status.status == 'live' || this.matchInfo.sport_event_status.status != res.data.sport_event_status.status) {
            this.matchInfo.statistics = res.data.statistics;
            if (res.data.timeline)
              this.initCommentry(res.data.timeline);
          }
        });
    }, classThis.commonService.miliseconds(0, 0, 8)); // TEMP

  }

  initCommentry(commentry) {
    commentry.forEach(element => {
      if (this.matchInfo.timeline.findIndex((timeline) => timeline.id == element.id) == -1)
        this.matchInfo.timeline.push(element);
    });
    // stoppage_time
    let tempTimeline: any = [this.matchInfo.timeline];
    tempTimeline = tempTimeline.splice(this.matchInfo.timeline.length - 1, 1)[0];
    // tempTimeline = tempTimeline.pop();
    if (typeof tempTimeline.match_time != 'undefined') {
      if (typeof tempTimeline.stoppage_time != 'undefined')
        this.matchInfo.match_time = tempTimeline.match_time + ' + ' + tempTimeline.stoppage_time.toString();
      else
        this.matchInfo.match_time = tempTimeline.match_time;
    }
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
    if (remainingTime.days == 0 && remainingTime.hours < 5) {
      this.timeout = setTimeout(() => {
        this.getLiveUpdate(this);
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

}

