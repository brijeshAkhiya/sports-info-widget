
import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import * as Cricket from '@store/cricket/cricket.actions';
import * as Kabaddi from '@store/kabaddi/kabaddi.actions';
import * as Soccer from '@store/soccer/soccer.actions';
import * as Basketball from '@store/basketball/basketball.actions';
import * as fromRoot from '@app/app-reducer';
import { appSelectors } from '@store/selectors/index';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-upperslider',
  templateUrl: './upperslider.component.html',
  styleUrls: ['./upperslider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UppersliderComponent implements OnInit, OnDestroy {

  timerStartTime = {
    'Cricket': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '8', 'isLiveUpdate': false, 'isStartAfterTime': false }, // from when to start fetching live data, interval in sec
    'Kabaddi': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5', 'isLiveUpdate': false, 'isStartAfterTime': false }, // interval in sec
    'Soccer': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5', 'isLiveUpdate': false, 'isStartAfterTime': false }, // interval in sec
    'Basketball': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '5', 'interval': '8', 'isLiveUpdate': false, 'isStartAfterTime': false }, // interval in sec
  };
  sport = 'Cricket';
  interval;
  slider = [];
  timeout;
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    // rtl:true,
    responsive: {
      0: {
        items: 1
      },
      458: {
        items: 2
      },
      656: {
        items: 3
      },
      1046: {
        items: 4
      }
    },
    nav: true
  };
  customOptions1: any = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    // rtl:true,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };
  liveMatchesSubscription;
  scheduleSubscription;
  runningMatchFlagSubscription;

  @ViewChild('sportsSlider') public sportsSlider: CarouselComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {

    this.loadAllSportsData();

    if (localStorage.getItem('selectedSport') != null) {
      this.sport = localStorage.getItem('selectedSport');
    }
    if (localStorage.getItem('userLng') === 'arabic') {
      this.customOptions.rtl = true;
      this.customOptions1.rtl = true;
    }
    if (this.sportsSlider) {
      setTimeout(() => {
        this.sportsSlider.to(this.sport.toString());
        // this.loadData();
      });
    }

  }

  loadAllSportsData() {
    this.store.dispatch(new Cricket.LoadCricketSlider());

    this.store.dispatch(new Soccer.LoadSoccerFixtures());

    this.store.dispatch(new Basketball.LoadBasketballSchedule());

    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
    this.store.dispatch(new Kabaddi.LoadKabaddiResults());
    this.store.dispatch(new Kabaddi.LoadKabaddiLive());
  }

  // change slide select sport event
  changeSlide(event) {

    if (event.slides.length > 0) {
      this.clearTimeInterval();
      this.sport = event.slides[0].id;
      localStorage.setItem('selectedSport', this.sport);
      this.slider = [];
      this.loadData();
    } else if (this.sport == 'Cricket') {
      this.clearTimeInterval();
      localStorage.setItem('selectedSport', this.sport);
      this.slider = [];
      this.loadData();
    }
  }

  loadData() {

    if (this.sport == 'Kabaddi')
      this.loadKabaddiData();
    else if (this.sport == 'Cricket')
      this.getCricketHeader();
    else if (this.sport == 'Soccer')
      this.loadSoccerData();
    else if (this.sport == 'Basketball')
      this.loadBasketballData();
  }

  getBasketBallSchedule() {

    this.sportsService.getBasketballSchedule1().subscribe((res: any) => {
      if (res.data) {
        this.store.dispatch(new Basketball.LoadBasketballScheduleSuccess(res.data));
      }
    });
  }

  loadBasketballData() {
    this.timerStartTime.Basketball.isLiveUpdate = false;
    this.timerStartTime.Basketball.isStartAfterTime = false;
    this.scheduleSubscription = this.store.select(appSelectors.getBasketballSchedule).subscribe((data: any) => {
      if (data && data.length > 0) {
        let liveMatches = this.slider = data.filter((match) => ['inprogress', 'halftime', 'delayed'].indexOf(match.status) > -1);
        this.slider = this.commonService.sortBtDate(this.slider.concat(data.filter((match) => ['closed', 'complete'].indexOf(match.status) > -1)), 'scheduled', 'desc');
        let fixtures = this.commonService.sortBtDate(data.filter((match) => ['scheduled', 'created'].indexOf(match.status) > -1), 'scheduled', 'asc');
        this.slider = this.slider.concat(fixtures);
        if (liveMatches.length > 0 && !this.timerStartTime.Basketball.isLiveUpdate) {
          this.getLiveBasketballUpdate(this);
        } else if (!this.timerStartTime.Basketball.isLiveUpdate && !this.timerStartTime.Basketball.isStartAfterTime && (Object.entries(fixtures).length > 0 && fixtures.length > 0)) {
          let minTime = new Date(Math.min.apply(null, fixtures.map(function (e) {
            return new Date(moment.utc(e.scheduled).format());
          })));
          this.startLiveUpdateAfterTime(moment.utc(minTime).format());
        }
      }
    });
  }
  updateBasketballSlider(matches) {
    Object.keys(matches).map(match => {
      let matchIndex = this.slider.findIndex((slide) => slide.id == matches[match].id);
      if (matchIndex >= 0) {
        let status = this.slider[matchIndex].status;
        this.slider[matchIndex].home = matches[match].home;
        this.slider[matchIndex].away = matches[match].away;
        this.slider[matchIndex].status = matches[match].status;
        this.slider[matchIndex].home_points = matches[match].home.points;
        this.slider[matchIndex].away_points = matches[match].away.points;
        if (['closed', 'complete'].indexOf(matches[match].status) > -1 && ['closed', 'complete'].indexOf(status) == 0) {
          this.clearTimeInterval();
          this.getBasketBallSchedule();
        }
      }
    });
  }
  getLiveBasketballUpdate(classThis) {
    /** Subscribe for Live Match info */
    this.liveMatchesSubscription = this.store.select(appSelectors.getBasketballMatches).subscribe((match) => {
      if (Object.entries(match).length !== 0)
        this.updateBasketballSlider(match);
    });
    /** If match info has already start interval */
    if (this.router.url.includes('/basketball/match/')) return false;


    /** If Basketball live update is already started, No need to start interval for Live match Info */
    this.runningMatchFlagSubscription = this.store.select(appSelectors.getBasketballLiveIds).subscribe((matches) => {
      let liveMatches = this.slider.filter((match) => match.status == 'inprogress' || match.status == 'halftime' || match.status == 'delayed');
      liveMatches.map((match) => {
        if (Object.entries(matches).length == 0 || Object.keys(matches).filter((id) => match.id == id).length == 0) {
          this.interval = setInterval(() => {
            classThis.sportsService
              .getBasketballMatchSummary(match.id)
              .subscribe(res => {
                this.store.dispatch(new Basketball.SaveBasketballMatches(res.data));
              });
          }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Basketball.interval));

        }
      });
    });
  }

  loadSoccerData() {

    this.timerStartTime.Soccer.isLiveUpdate = false;
    this.timerStartTime.Soccer.isStartAfterTime = false;
    this.store.dispatch(new Soccer.LoadSoccerFixtures());
    this.store.select('Soccer').subscribe((data: any) => {

      if (data.fixtures && data.fixtures.length > 0) {

        let liveMatches = this.slider = data.fixtures.filter((match) =>
          match.sport_event_status && match.sport_event_status.status == 'live' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context
        );
        this.slider = this.slider.concat(data.fixtures.filter((match) =>
          match.sport_event_status && match.sport_event_status.status == 'closed' && match.sport_event_status.match_status != 'cancelled'
        ));
        let fixtures = data.fixtures.filter((match) =>
          match.sport_event_status && match.sport_event_status.status == 'not_started' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context
        );
        this.slider = this.slider.concat(fixtures);
        if (liveMatches.length > 0 && !this.timerStartTime.Soccer.isLiveUpdate) {
          this.getLiveSoccerUpdate(this);
        } else if (!this.timerStartTime.Soccer.isLiveUpdate && !this.timerStartTime.Soccer.isStartAfterTime && (Object.entries(fixtures).length > 0 && fixtures.length > 0)) {
          let minTime = new Date(Math.min.apply(null, fixtures.map(function (e) {
            return new Date(moment.utc(e.sport_event.start_time).format());
          })));
          this.startLiveUpdateAfterTime(moment.utc(minTime).format());
        }
      }
    });
  }
  getLiveSoccerUpdate(classThis) {
    this.timerStartTime.Soccer.isLiveUpdate = true;
    let date = new Date();
    this.interval = setInterval(() => {
      classThis.sportsService
        .getSoccerDailySummary(this.commonService.convertDate(date)).subscribe((res: any) => {
          if (res.data.summaries.length > 0) {
            this.store.dispatch(
              new Soccer.LoadSoccerLiveSuccess(
                res.data.summaries.filter((match) =>
                  match.sport_event_status && match.sport_event_status.status == 'live' &&
                  match.sport_event.coverage.sport_event_properties.scores == 'live' &&
                  match.sport_event.sport_event_context
                )));
            res.data.summaries.forEach(match => {
              let matchIndex = this.slider.findIndex((slide) => slide.sport_event.id == match.sport_event.id);
              if (matchIndex >= 0) {
                this.slider[matchIndex].sport_event = match.sport_event;
                this.slider[matchIndex].sport_event_status = match.sport_event_status;
              }
            });
          } else {
            this.clearTimeInterval();
            this.loadSoccerData();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Soccer.interval));
  }

  loadKabaddiData() {
    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
    this.store.dispatch(new Kabaddi.LoadKabaddiResults());
    this.store.dispatch(new Kabaddi.LoadKabaddiLive());
    this.store.select('Kabaddi').subscribe((res: any) => {

      // this.slider = [];
      // this.clearTimeInterval();
      // let isLiveUpdate = false;
      if (Object.entries(res.live).length > 0 && res.live.item && res.live.items.length > 0 && !this.timerStartTime.Kabaddi.isLiveUpdate) {
        this.slider = this.slider.concat(res.live.items);
        this.getLiveKabaddiUpdate(this);
        // isLiveUpdate = true;
      }

      if (Object.entries(res.results).length > 0 && res.results.items.length > 0)
        this.slider = this.slider.concat(res.results.items.slice(0, 3));
      if (Object.entries(res.fixtures).length > 0 && res.fixtures.items.length > 0)
        this.slider = this.slider.concat(res.fixtures.items.slice(0, 3));

      if (!this.timerStartTime.Kabaddi.isLiveUpdate && !this.timerStartTime.Kabaddi.isStartAfterTime && (Object.entries(res.fixtures).length > 0 && res.fixtures.items.length > 0)) {
        let minTime = new Date(Math.min.apply(null, res.fixtures.items.map(function (e) {
          return new Date(moment.utc(e.datestart).format());
        })));
        this.startLiveUpdateAfterTime(moment.utc(minTime).format());
      }
    });
  }

  getLiveKabaddiUpdate(classThis) {

    let paramsLive = { reqParams: { 'status': 3, 'per_page': 10, 'page': 1 }, data: [] };
    this.interval = setInterval(() => {

      classThis.sportsService
        // .getKabaddiMatchDummyList('live_list')
        .getKabaddiMatchList(paramsLive.reqParams.status, paramsLive.reqParams.per_page, paramsLive.reqParams.page).subscribe((res: any) => {
          res = res;
          if (res.data.items.length > 0) {

            this.store.dispatch(new Kabaddi.LoadKabaddiLiveSuccess(res.data.items));
            res.data.items.forEach(match => {
              let matchIndex = this.slider.findIndex((slide) => slide.mid == match.mid);
              if (matchIndex >= 0) {
                this.slider[matchIndex].result = match.result;
                this.slider[matchIndex].status = match.status;
                this.slider[matchIndex].status_str = match.status_str;
              }
            });
          } else {
            this.clearTimeInterval();
            this.loadKabaddiData();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Kabaddi.interval));
  }

  getCricketHeader() {
    this.store.dispatch(new Cricket.LoadCricketSlider());
    this.store.select('Cricket').subscribe((res: any) => {
      if (this.slider.length == 0) {
        this.slider = this.sortBySchedule(res.slider);
        this.slider.forEach((match, index) => {
          let compObj = {};
          match.competitors.map(s => {
            compObj[s.qualifier] = s;
          });
          this.slider[index].competitorsObj = compObj;
          if (match.match_data && match.match_data.period_scores)
            this.setPeriodScore(match, index, match.match_data.period_scores);
          else if (match.period_scores)
            this.setPeriodScore(match, index, match.period_scores);
          else
            this.slider[index].competitorsObj['home'].show_first = true;
        });

        let livematchcount = res.slider.filter(match => match.status == 'live' || match.status == 'interrupted' || match.status == 'delayed');

        if (livematchcount.length > 0)
          this.getLiveUpdateSlider(this);
        else {
          let upcomingMatchcount = res.slider.filter(match => match.status == 'not_started');
          if (upcomingMatchcount.length > 0) {
            let minTime = new Date(Math.min.apply(null, upcomingMatchcount.map(function (e) {
              return new Date(e.scheduled);
            })));

            this.startLiveUpdateAfterTime(minTime);
          }
        }
      }

    });
  }


  getLiveUpdateSlider(classThis) {
    this.interval = setInterval(() => {
      classThis.sportsService.getheaderslider().subscribe((res: any) => {

        this.store.dispatch(new Cricket.LoadCricketSliderSuccess(res.data));
        // this.slider = this.sortBySchedule(res.data);
        res.data.forEach((match, index) => {
          let indexSlider = this.slider.findIndex((slide) => slide.id == match.id);
          if (indexSlider >= 0) {
            this.slider[indexSlider].status = match.status;
            if (match.match_data && match.match_data.period_scores) {
              this.setPeriodScore(match, indexSlider, match.match_data.period_scores);
            } else if (match.period_scores)
              this.setPeriodScore(match, indexSlider, match.period_scores);
            else
              this.slider[indexSlider].competitorsObj['home'].show_first = true;
          }
        });
      });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Cricket.interval)); // TEMP
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime(scheduled) {
    if (!this.timerStartTime[this.sport].isStartAfterTime) {

      let remainingTime = this.commonService.getRemainigTimeofMatch(scheduled);
      let remainingMiliSec = this.commonService.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds);
      remainingMiliSec = remainingMiliSec - this.commonService.miliseconds(0, this.timerStartTime[this.sport].beforeTimeStart, 0);

      if (remainingTime.days == 0 && remainingTime.hours < this.timerStartTime[this.sport].timeout.hours) {
        this.timeout = setTimeout(() => {
          if (this.sport == 'Kabaddi') {
            this.getLiveKabaddiUpdate(this);
            this.timerStartTime.Kabaddi.isStartAfterTime = true;
          } else if (this.sport == 'Cricket')
            this.getLiveUpdateSlider(this);
          else if (this.sport == 'Soccer') {
            this.getLiveSoccerUpdate(this);
            this.timerStartTime.Soccer.isStartAfterTime = true;
          } else if (this.sport == 'Basketball') {
            this.getLiveBasketballUpdate(this);
            this.timerStartTime.Soccer.isStartAfterTime = true;
          }
        }, remainingMiliSec);
      } else if (remainingMiliSec < 0) {
        if (this.sport == 'Kabaddi') {
          this.getLiveKabaddiUpdate(this);
        } else if (this.sport == 'Cricket')
          this.getLiveUpdateSlider(this);
        else if (this.sport == 'Soccer') {
          this.getLiveSoccerUpdate(this);
          this.timerStartTime.Soccer.isStartAfterTime = true;
        } else if (this.sport == 'Basketball') {
          this.getLiveBasketballUpdate(this);
          this.timerStartTime.Soccer.isStartAfterTime = true;
        }
      }

    }

  }
  setPeriodScore(match, index, period_scores) {
    if (period_scores.length > 0) {
      period_scores.map(sPScore => {
        if (sPScore.home_score) {
          this.slider[index].competitorsObj['home'].period_scores = sPScore;
          if (sPScore.number === 1) {
            this.slider[index].competitorsObj['home'].show_first = true;
          }
        } else if (sPScore.away_score) {
          if (sPScore.number === 1) {
            this.slider[index].competitorsObj['away'].show_first = true;
          }
          this.slider[index].competitorsObj['away'].period_scores = sPScore;
        }
      });
    }
  }

  replace(str) {
    return (str != null) ? str.replace(/_/g, ' ') : str;
  }
  sortBySchedule(arr) {
    return arr.sort(function (a, b) {
      if (a.status == 'live' || a.status == 'interrupted' || a.status == 'abandoned' || a.status == 'postponded' || a.status == 'delayed') {
        return -1;
      } else if (a.status == 'not_started') {
        if (a.scheduled && b.scheduled) {
          let aDate: any = new Date(a.scheduled);
          let bDate: any = new Date(b.scheduled);
          return aDate - bDate;
        }
      } else {
        return 0;
      }
    });
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    if (this.runningMatchFlagSubscription) this.runningMatchFlagSubscription.unsubscribe();
    this.store.dispatch(new Basketball.RemoveBasketballUpdate());
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.timerStartTime.Soccer.isLiveUpdate = false;
    this.timerStartTime.Soccer.isStartAfterTime = false;
    if (this.liveMatchesSubscription) this.liveMatchesSubscription.unsubscribe();
    if (this.scheduleSubscription) this.scheduleSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.clearTimeInterval();
  }

}
