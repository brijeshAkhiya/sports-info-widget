import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from './shared/providers/common-service';
import { SportsService } from './shared/providers/sports-service';
import * as Cricket from '@store/cricket/cricket.actions';
import * as fromRoot from '@app/app-reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  timerStartTime = {
    'Cricket': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '8', 'isLiveUpdate': false, 'isStartAfterTime': false }, // from when to start fetching live data, interval in sec
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
      450: {
        items: 2
      },
      656: {
        items: 3
      },
      856: {
        items: 4
      },
      1046: {
        items: 5
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
  isBrowser = true;

  @ViewChild('sportsSlider') public sportsSlider: CarouselComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public commonService: CommonService,
    private store: Store<fromRoot.State>,
    private sportsService: SportsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
      if (this.commonService.getFromStorage('userLng') === 'arabic') {
        this.customOptions.rtl = true;
        this.customOptions1.rtl = true;
      }
    } else
      this.isBrowser = false;
  }

  loadAllSportsData() {
    this.store.dispatch(new Cricket.LoadCricketSlider());
  }
  loadData() {
    this.getCricketHeader();
  }
  navigate(id, match) {
    window.location.replace('https://www.sports.info/cricket/match/' + id.split(':')[2] + '/' + match);
  }

  getCricketHeader() {
    this.store.dispatch(new Cricket.LoadCricketSlider());
    this.store.select('Cricket').pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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
      classThis.sportsService.getheaderslider().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {

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
          if (this.sport == 'Cricket')
            this.getLiveUpdateSlider(this);
        }, remainingMiliSec);
      } else if (remainingMiliSec < 0) {
        if (this.sport == 'Cricket')
          this.getLiveUpdateSlider(this);
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
    if (isPlatformBrowser(this.platformId)) {
      if (this.runningMatchFlagSubscription) this.runningMatchFlagSubscription.unsubscribe();
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      if (this.liveMatchesSubscription) this.liveMatchesSubscription.unsubscribe();
      if (this.scheduleSubscription) this.scheduleSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.clearTimeInterval();
  }

}
