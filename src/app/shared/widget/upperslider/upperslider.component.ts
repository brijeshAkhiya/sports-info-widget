import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import * as moment from 'moment';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import * as Kabaddi from "@store/kabaddi/kabaddi.actions";
import * as Soccer from "@store/soccer/soccer.actions";
import * as fromRoot from "@app/app-reducer";
import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: 'app-upperslider',
  templateUrl: './upperslider.component.html',
  styleUrls: ['./upperslider.component.css']
})
export class UppersliderComponent implements OnInit {

  timerStartTime = {
    'Cricket': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '8' }, // beforeTimeStart(Min) - from when to start fetching live data, interval in sec
    'Kabaddi': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5' }, // interval in sec
    'Soccer': { 'timeout': { 'hours': 5 }, 'beforeTimeStart': '10', 'interval': '5' }, // interval in sec
  }
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
    navText: ["", ""],
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
  customOptions1= {
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
  }
  @ViewChild('sportsSlider') public sportsSlider: CarouselComponent;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private cricketService: CricketService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() { 
    if(localStorage.getItem("selectedSport") != null) 
      this.sport = localStorage.getItem("selectedSport");

    if(this.sportsSlider){
      setTimeout(() => {
        this.sportsSlider.to(this.sport.toString()); 
        this.loadData();
      });
    }
    
  }

  //change slide select sport event
  changeSlide(event){
    console.log("changeSlide");
    
    if(this.slider.length > 0 && event.slides.length > 0){
      this.sport = event.slides[0].id
      localStorage.setItem("selectedSport", this.sport);
      this.slider = [];
      this.loadData();  
      this.clearTimeInterval();
    }
  }

  loadData() {
    console.log("load Data");
    
    if (this.sport == 'Kabaddi')
      this.loadKabaddiData();
    else if (this.sport == 'Cricket')
      this.getCricketHeader();
    else if (this.sport == 'Soccer')
      this.loadSoccerData();
  }

  loadSoccerData() {
    console.log("loadSoccerData");
    
    this.store.dispatch(new Soccer.LoadSoccerFixtures())
    this.store.select('Soccer').subscribe((data: any) => {
      let isSoccerLiveUpdate = false;
      if (data.fixtures && data.fixtures.length > 0) {

        let live = this.slider = data.fixtures.filter((match) => match.sport_event_status.status == 'live' && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context && match.sport_event.sport_event_context.category.name == 'International Clubs')
        if (this.slider.length < 4) {
          live = this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'live'  && match.sport_event.coverage.sport_event_properties.scores == 'live'  && match.sport_event.sport_event_context.category.name != 'International Clubs'))
        }
        console.log("todays live matches", this.slider);  
        if(live.length > 0){
          this.getLiveSoccerUpdate(this);
          isSoccerLiveUpdate = true;
        }  

        let fixtures = this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'not_started'  && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context && match.sport_event.sport_event_context.category.name == 'International Clubs'));
        // if (this.slider.length < 4) {
          fixtures = this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'not_started'  && match.sport_event.coverage.sport_event_properties.scores == 'live' && match.sport_event.sport_event_context.category.name != 'International Clubs'))
        // }
        console.log("upcoming with live coverage", this.slider);    
        // this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event_status.match_status != 'cancelled' && match.sport_event.sport_event_context && match.sport_event.sport_event_context.category.name == 'International Clubs'))
        // if (this.slider.length < 50) {
          this.slider = this.slider.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event_status.match_status != 'cancelled' && match.sport_event.sport_event_context.category.name != 'International Clubs'))
        // }

        if (!isSoccerLiveUpdate && (Object.entries(fixtures).length > 0 && fixtures.length > 0)) {
          let minTime = new Date(Math.min.apply(null, fixtures.map(function (e) {
            return new Date(moment.utc(e.sport_event.start_time).format());
          })));
          console.log(minTime);          
          this.startLiveUpdateAfterTime(moment.utc(minTime).format());
        }
        console.log(this.slider);    
      }
    })
  }

  replace(str) {
    return (str != null) ? str.replace(/_/g, " ") : str;
  }
  getLiveSoccerUpdate(classThis) {
    console.log("getLiveSoccerUpdate");
    
    let date = new Date();
    this.interval = setInterval(() => {
      classThis.sportsService
        .getSoccerDailySummary(this.commonService.convertDate(date)).subscribe((res: any) => {
          console.log(res);
          if (res.data.summaries.length > 0) {
            res.data.summaries.forEach(match => {
              let matchIndex = this.slider.findIndex((slide) => slide.sport_event.id == match.sport_event.id);
              if (matchIndex >= 0) {
                this.slider[matchIndex].sport_event = match.sport_event;
                this.slider[matchIndex].sport_event_status = match.sport_event_status;
              }
            });
            console.log(this.slider);
            
          }
          else {
            this.clearTimeInterval();
            this.loadSoccerData();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Soccer.interval));
  }

  loadKabaddiData() {
    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
    this.store.dispatch(new Kabaddi.LoadKabaddiResults())
    this.store.dispatch(new Kabaddi.LoadKabaddiLive())
    this.store.select('Kabaddi').subscribe((res: any) => {

      this.slider = [];
      this.clearTimeInterval();
      let isLiveUpdate = false;
      console.log("store subscribe");
      console.log(res);

      if (Object.entries(res.live).length > 0 && res.live.items.length > 0) {
        this.slider = this.slider.concat(res.live.items);
        this.getLiveKabaddiUpdate(this);
        isLiveUpdate = true;
      }

      if (Object.entries(res.results).length > 0 && res.results.items.length > 0)
        this.slider = this.slider.concat(res.results.items.slice(0, 3));
      if (Object.entries(res.fixtures).length > 0 && res.fixtures.items.length > 0)
        this.slider = this.slider.concat(res.fixtures.items.slice(0, 3));
      if (!isLiveUpdate && (Object.entries(res.fixtures).length > 0 && res.fixtures.items.length > 0)) {
        let minTime = new Date(Math.min.apply(null, res.fixtures.items.map(function (e) {
          return new Date(moment.utc(e.datestart).format());
        })));
        this.startLiveUpdateAfterTime(moment.utc(minTime).format());
      }
    });
    console.log("slider");
    console.log(this.slider);
  }

  getLiveKabaddiUpdate(classThis) {

    let paramsLive = { reqParams: { 'status': 3, 'per_page': 10, 'page': 1 }, data: [] }
    this.interval = setInterval(() => {

      classThis.sportsService
        // .getKabaddiMatchDummyList('live_list')
        .getSoccerDailySummary(paramsLive.reqParams.status, paramsLive.reqParams.per_page, paramsLive.reqParams.page).subscribe((res: any) => {
          console.log(res);
          res = res;
          if (res.data.items.length > 0) {
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
    this.sportsService.getheaderslider().subscribe((res: any) => {
      this.slider = this.sortBySchedule(res.data);
      this.slider.forEach((match, index) => {

        let compObj = {};
        match.competitors.map(s => {
          compObj[s.qualifier] = s
        });
        this.slider[index].competitors = compObj

        if (match.match_data && match.match_data.period_scores)
          this.setPeriodScore(match, index, match.match_data.period_scores)
        else if (match.period_scores)
          this.setPeriodScore(match, index, match.period_scores)
        else
          this.slider[index].competitors["home"].show_first = true;
      });

      let livematchcount = res.data.filter(match => match.status == "live" || match.status == "interrupted" || match.status == "delayed")
      if (livematchcount.length > 0)
        this.getLiveUpdateSlider(this);
      else {
        let upcomingMatchcount = res.data.filter(match => match.status == "not_started")
        if (upcomingMatchcount.length > 0) {
          let minTime = new Date(Math.min.apply(null, upcomingMatchcount.map(function (e) {
            return new Date(e.scheduled);
          })));
          this.startLiveUpdateAfterTime(minTime);
        }
      }

    });
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime(scheduled) {
    console.log("startLiveUpdateAfterTime");

    let remainingTime = this.commonService.getRemainigTimeofMatch(scheduled);

    let remainingMiliSec = this.commonService.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds);
    remainingMiliSec = remainingMiliSec - this.commonService.miliseconds(0, this.timerStartTime[this.sport].beforeTimeStart, 0);

    console.log("remainingMiliSec", remainingMiliSec);
    if (remainingTime.days == 0 && remainingTime.hours < this.timerStartTime[this.sport].timeout.hours) {
      this.timeout = setTimeout(() => {
        if (this.sport == 'Kabaddi')
          this.getLiveKabaddiUpdate(this)
        else if (this.sport == 'Cricket')
          this.getLiveUpdateSlider(this)
        else if (this.sport == 'Soccer')
          this.getLiveSoccerUpdate(this)
      }, remainingMiliSec);
    }
  }

  setPeriodScore(match, index, period_scores) {
    // console.log("setPeriodScore");
    if (period_scores.length > 0) {
      period_scores.map(sPScore => {
        if (sPScore.home_score) {
          this.slider[index].competitors["home"].period_scores = sPScore;
          if (sPScore.number === 1) {
            this.slider[index].competitors["home"].show_first = true;
          }
        } else if (sPScore.away_score) {
          if (sPScore.number === 1) {
            this.slider[index].competitors["away"].show_first = true;
          }
          this.slider[index].competitors["away"].period_scores = sPScore;
        }
      });
    }
    // console.log(this.slider);

  }

  getLiveUpdateSlider(classThis) {
    this.interval = setInterval(() => {
      classThis.sportsService.getheaderslider().subscribe((res: any) => {
        // this.slider = this.sortBySchedule(res.data);   
        res.data.forEach((match, index) => {
          let indexSlider = this.slider.findIndex((slide) => slide.id == match.id);
          if (indexSlider >= 0) {
            this.slider[indexSlider].status = match.status;
            if (match.match_data && match.match_data.period_scores) {
              this.setPeriodScore(match, indexSlider, match.match_data.period_scores)
            }
            else if (match.period_scores)
              this.setPeriodScore(match, indexSlider, match.period_scores)
            else
              this.slider[indexSlider].competitors["home"].show_first = true;
          }
        });
      });
    }, classThis.commonService.miliseconds(0, 0, this.timerStartTime.Cricket.interval)); // TEMP 
    console.log(this.interval);

  }

  sortBySchedule(arr) {
    console.log(arr)
    return arr.sort(function (a, b) {
      if (a.status == 'live' || a.status == 'interrupted' || a.status == 'abandoned' || a.status == 'postponded' || a.status == 'delayed') {
        return -1
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
    console.log("clearTimeInterval");
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }

}
