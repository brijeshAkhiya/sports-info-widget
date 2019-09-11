import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import * as Cricket from '@store/cricket/cricket.actions';
import * as Kabaddi from '@store/kabaddi/kabaddi.actions';
import * as Soccer from '@store/soccer/soccer.actions';
import * as fromRoot from '@app/app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-upperslider',
  templateUrl: './upperslider.component.html',
  styleUrls: ['./upperslider.component.css']
})
export class UppersliderComponent implements OnInit {

  timerStartTime = {
    'Cricket': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '8', 'isLiveUpdate': false, 'isStartAfterTime': false }, // from when to start fetching live data, interval in sec
    'Kabaddi': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5', 'isLiveUpdate': false, 'isStartAfterTime': false }, // interval in sec
    'Soccer': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5', 'isLiveUpdate': false, 'isStartAfterTime': false }, // interval in sec
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
  customOptions1 = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };
  @ViewChild('sportsSlider') public sportsSlider: CarouselComponent;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    console.log('ngOnInit');

    this.loadAllSportsData();

    if (localStorage.getItem('selectedSport') != null)
      this.sport = localStorage.getItem('selectedSport');

    if (this.sportsSlider) {
      setTimeout(() => {
        console.log('setTimeout');
        this.sportsSlider.to(this.sport.toString());
        // this.loadData();
      });
    }

  }

  loadAllSportsData() {
    this.store.dispatch(new Cricket.LoadCricketSlider());

    this.store.dispatch(new Soccer.LoadSoccerFixtures());

    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
    this.store.dispatch(new Kabaddi.LoadKabaddiResults());
    this.store.dispatch(new Kabaddi.LoadKabaddiLive());
  }

  //change slide select sport event
  changeSlide(event) {
    console.log('changeSlide');
    console.log(event, this.sport);

    if (event.slides.length > 0) {
      this.clearTimeInterval();
      this.sport = event.slides[0].id;
      localStorage.setItem('selectedSport', this.sport);
      this.slider = [];
      this.loadData();
    }
    else if (this.sport == 'Cricket') {
      this.clearTimeInterval();
      localStorage.setItem('selectedSport', this.sport);
      this.slider = [];
      this.loadData();
    }
  }

  loadData() {
    console.log('load Data');

    if (this.sport == 'Kabaddi')
      this.loadKabaddiData();
    else if (this.sport == 'Cricket')
      this.getCricketHeader();
    else if (this.sport == 'Soccer')
      this.loadSoccerData();
  }

  loadSoccerData() {
    console.log('loadSoccerData');

    this.timerStartTime.Soccer.isLiveUpdate = false;
    this.timerStartTime.Soccer.isStartAfterTime = false;
    this.store.dispatch(new Soccer.LoadSoccerFixtures());
    this.store.select('Soccer').subscribe((data: any) => {

      if (data.fixtures && data.fixtures.length > 0) {

        let liveMatches = this.slider = data.fixtures.filter((match) => match.sport_event_status.status == 'live' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context);
        this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event_status.match_status != 'cancelled'));
        let fixtures = data.fixtures.filter((match) => match.sport_event_status.status == 'not_started' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context);
        this.slider = this.slider.concat(fixtures);
        if (liveMatches.length > 0 && !this.timerStartTime.Soccer.isLiveUpdate) {
          this.getLiveSoccerUpdate(this);
        }
        else if (!this.timerStartTime.Soccer.isLiveUpdate && !this.timerStartTime.Soccer.isStartAfterTime && (Object.entries(fixtures).length > 0 && fixtures.length > 0)) {
          let minTime = new Date(Math.min.apply(null, fixtures.map(function (e) {
            return new Date(moment.utc(e.sport_event.start_time).format());
          })));
          this.startLiveUpdateAfterTime(moment.utc(minTime).format());
        }
      }
    });
  }
  getLiveSoccerUpdate(classThis) {
    console.log('getLiveSoccerUpdate');
    this.timerStartTime.Soccer.isLiveUpdate = true;
    let date = new Date();
    this.interval = setInterval(() => {
      classThis.sportsService
        .getSoccerDailySummary(this.commonService.convertDate(date)).subscribe((res: any) => {
          if (res.data.summaries.length > 0) {
            this.store.dispatch(new Soccer.LoadSoccerLiveSuccess(res.data.summaries.filter((match) => match.sport_event_status.status == 'live' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context)));
            res.data.summaries.forEach(match => {
              let matchIndex = this.slider.findIndex((slide) => slide.sport_event.id == match.sport_event.id);
              if (matchIndex >= 0) {
                this.slider[matchIndex].sport_event = match.sport_event;
                this.slider[matchIndex].sport_event_status = match.sport_event_status;
              }
            });
          }
          else {
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
      if (Object.entries(res.live).length > 0 && res.live.items.length > 0 && !this.timerStartTime.Kabaddi.isLiveUpdate) {
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
        .getSoccerDailySummary(paramsLive.reqParams.status, paramsLive.reqParams.per_page, paramsLive.reqParams.page).subscribe((res: any) => {
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
          }
          else {
            this.clearTimeInterval();
            this.loadKabaddiData();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Kabaddi.interval));
  }

  getCricketHeader() {
    this.store.dispatch(new Cricket.LoadCricketSlider());
    this.store.select('Cricket').subscribe((res: any) => {
      // console.log('res');
      // console.log(res);
      // console.log(this.slider);
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
        console.log('livematchcount', livematchcount);

        if (livematchcount.length > 0)
          this.getLiveUpdateSlider(this);
        else {
          let upcomingMatchcount = res.slider.filter(match => match.status == 'not_started');
          if (upcomingMatchcount.length > 0) {
            let minTime = new Date(Math.min.apply(null, upcomingMatchcount.map(function (e) {
              return new Date(e.scheduled);
            })));
            console.log(minTime);

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
            }
            else if (match.period_scores)
              this.setPeriodScore(match, indexSlider, match.period_scores);
            else
              this.slider[indexSlider].competitorsObj['home'].show_first = true;
          }
        });
      });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Cricket.interval)); // TEMP
    console.log(this.interval);
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime(scheduled) {
    console.log('startLiveUpdateAfterTime ', !this.timerStartTime[this.sport].isStartAfterTime);
    if (!this.timerStartTime[this.sport].isStartAfterTime) {
      console.log('startLiveUpdateAfterTime');

      let remainingTime = this.commonService.getRemainigTimeofMatch(scheduled);

      let remainingMiliSec = this.commonService.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds);
      remainingMiliSec = remainingMiliSec - this.commonService.miliseconds(0, this.timerStartTime[this.sport].beforeTimeStart, 0);

      console.log('remainingMiliSec', remainingMiliSec);
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
          }
        }, remainingMiliSec);
      }
    }

  }
  setPeriodScore(match, index, period_scores) {
    // console.log("setPeriodScore");
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
    // console.log(this.slider);
  }

  replace(str) {
    return (str != null) ? str.replace(/_/g, ' ') : str;
  }
  sortBySchedule(arr) {
    console.log(arr);
    return arr.sort(function (a, b) {
      if (a.status == 'live' || a.status == 'interrupted' || a.status == 'abandoned' || a.status == 'postponded' || a.status == 'delayed') {
        return -1;
      }
      else if (a.status == 'not_started') {
        if (a.scheduled && b.scheduled) {
          let aDate: any = new Date(a.scheduled);
          let bDate: any = new Date(b.scheduled);
          return aDate - bDate;
        }
      }
      else {
        return 0;
      }
    });
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    console.log('clearTimeInterval');
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.timerStartTime.Soccer.isLiveUpdate = false;
    this.timerStartTime.Soccer.isStartAfterTime = false;
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.clearTimeInterval();
  }

}
