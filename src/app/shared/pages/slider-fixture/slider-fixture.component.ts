import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-slider-fixture',
  templateUrl: './slider-fixture.component.html',
  styleUrls: ['./slider-fixture.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderFixtureComponent implements OnInit {

  @ViewChild('gallery') public gallery: CarouselComponent;

  params;
  paramData: any;
  customDate;
  model: any;
  tournamentid: any;
  searchText: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    const data: any = this.activatedroute.data;
    this.params = data.value;
    console.log(this.params);

    this.paramData = {
      loading: false, loadmore: false, data: [], fullData: [],
      selectedDate: { year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD'), monthStr: moment().format('MMM') },
      filterCategory: [],
      selectedCategory: { name: 'All' }
    };
    this.customDate = new Array<any>(
      moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day.toString()}`)
        .daysInMonth()).fill(0, 0).map((x, i) => i + 1);
    setTimeout(() => {
      this.loadDate(this.paramData.selectedDate);
    });
    this.getFixturesData();
  }
  loadDate(current) {
    this.customDate = new Array<any>(moment(`${current.year}-${current.month}-${current.day.toString()}`).daysInMonth()).fill(0, 0).map((x, i) => i + 1);
    if (this.gallery && this.gallery.slidesOutputData) {
      const temp = this.gallery.slidesOutputData.slides.filter((slide) => parseInt(slide.id) == current.day);
      if (temp.length == 0 || this.gallery.slidesOutputData.slides.length > 7)
        this.gallery.to(current.day.toString());
    }
  }
  initializedSlider($e) {
    setTimeout(() => {
      if (this.gallery.slidesOutputData.slides.length > 7)
        this.gallery.to(this.paramData.selectedDate.day.toString());
    });
  }
  selectDate(day) {
    this.paramData.data = [];
    this.paramData.selectedDate.day = this.checkDateWithZero(day);
    this.loadDate(this.paramData.selectedDate);
    this.getFixturesData();
  }
  dateChange($e) {
    this.paramData.data = [];
    this.paramData.selectedDate = {
      year: this.model.year,
      month: this.checkDateWithZero(this.model.month),
      day: this.checkDateWithZero(this.model.day),
      monthStr: moment(`${this.model.year}-${this.checkDateWithZero(this.model.month)}-${this.checkDateWithZero(this.model.day)}`).format('MMM')
    };
    this.loadDate(this.paramData.selectedDate);
    this.getFixturesData();
  }
  checkDateWithZero(value) {
    return (value != 0 && value.toString().length == 1) ? value : value;
  }
  getFixturesData() {
    console.log(this.params.sport);
    if (this.params.sport == 'Soccer')
      this.getSoccerData();
    else if (this.params.sport == 'Basketball')
      this.getBasketballDailySchedule();
    else if (this.params.sport == 'Hockey')
      this.getHockeyDailySchedule();
    else if (this.params.sport == 'Badminton')
      this.getBadmintonDailySchedule();
    else if (this.params.sport == 'Tennis')
      this.getTennisDailySchedule();
  }

  filter(category) {
    const obj = {};
    this.paramData.selectedCategory = category;
    if (category.name == 'All') {
      this.paramData.fullData.map((data) => {
        if (data.sport_event.sport_event_context) {
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = { 'season': data.sport_event.sport_event_context.season, matches: [] };
          obj[data.sport_event.sport_event_context.season.id].matches.push(data);
        }
      });
    } else {
      this.paramData.fullData.map((data) => {
        if (data.sport_event.sport_event_context && category.id == data.sport_event.sport_event_context.category.id) {
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = { 'season': data.sport_event.sport_event_context.season, matches: [] };
          obj[data.sport_event.sport_event_context.season.id].matches.push(data);
        }
      });
    }
    this.paramData.data = Object.keys(obj).map(key => ({ key, data: obj[key] }));
  }
  getTennisDailySchedule() {
    this.paramData.loading = true;
    this.sportsService
      .getTennisDailySummary(moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramData.loading = false;
        if (res.data && res.data.results && res.data.results.length > 0) {
          this.paramData.fullData = res.data.results;
          const obj = {};
          const category = {};
          res.data.results.map((data) => {
            // Category for filter
            if (data.sport_event) {
              // if (!category[data.sport_event.sport_event_context.category.id]) category[data.sport_event.sport_event_context.category.id] = data.sport_event.sport_event_context.category;

              if (data.sport_event.season) {
                if (!obj[data.sport_event.season.id]) obj[data.sport_event.season.id] = { 'season': data.sport_event.season, matches: [] };
                obj[data.sport_event.season.id].matches.push(data);
              }
            }
          });
          this.paramData.data = Object.keys(obj).map(key => ({ key, data: obj[key] }));
          this.paramData.filterCategory = Object.keys(category).map(key => ({ key, data: category[key] }));
          this.paramData.filterCategory = this.commonService.sortByName(this.paramData.filterCategory, 'name');
          console.log(this.paramData.data)
        }
      },
        error => this.paramData.loading = false);
  }
  getBasketballDailySchedule() {
    this.paramData.loading = true;
    this.sportsService
      .getBasketballDailySummary(moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramData.loading = false;
        if (res) {
          this.paramData.data = res.data.games;
        }
      },
        error => this.paramData.loading = false);
  }
  getHockeyDailySchedule() {
    this.paramData.loading = true;
    this.sportsService
      .getHocketDailySummary(moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramData.loading = false;
        if (res.data && res.data.summaries) {
          this.paramData.data = res.data.summaries;
        }
      },
        error => this.paramData.loading = false);
  }
  getBadmintonDailySchedule() {
    this.paramData.loading = true;
    this.sportsService
      .getBadmintonDailySummary(moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramData.loading = false;
        if (res.data && res.data.summaries) {
          this.paramData.data = res.data.summaries;
        }
      },
        error => this.paramData.loading = false);
  }

  getSoccerData() {
    this.paramData.loading = true;
    this.sportsService
      .getSoccerDailySummary(moment(`${this.paramData.selectedDate.year}-${this.paramData.selectedDate.month}-${this.paramData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramData.loading = false;
        if (res.data && res.data.summaries && res.data.summaries.length > 0) {
          this.paramData.fullData = res.data.summaries;
          const obj = {};
          const category = {};
          res.data.summaries.map((data) => {
            // Category for filter
            if (data.sport_event.sport_event_context) {
              if (!category[data.sport_event.sport_event_context.category.id]) category[data.sport_event.sport_event_context.category.id] = data.sport_event.sport_event_context.category;

              if (data.sport_event.sport_event_context.season) {
                if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = { 'season': data.sport_event.sport_event_context.season, matches: [] };
                obj[data.sport_event.sport_event_context.season.id].matches.push(data);
              }
            }
          });
          this.paramData.data = Object.keys(obj).map(key => ({ key, data: obj[key] }));
          this.paramData.filterCategory = Object.keys(category).map(key => ({ key, data: category[key] }));
          this.paramData.filterCategory = this.commonService.sortByName(this.paramData.filterCategory, 'name');

        }
      }, (error) => {
        this.paramData.loading = false;
      });
  }

  sortArr(data, format, date_param, sort_type) {
    data.sort((a, b) => {
      if (sort_type === 'asc') {
        return new Date(a['sport_event'][date_param]) < new Date(b['sport_event'][date_param]) ? -1 : new Date(a['sport_event'][date_param]) > new Date(b['sport_event'][date_param]) ? 1 : 0;
      } else {
        return new Date(a['sport_event'][date_param]) > new Date(b['sport_event'][date_param]) ? -1 : new Date(a['sport_event'][date_param]) < new Date(b['sport_event'][date_param]) ? 1 : 0;
      }
    });
    const dateObj = {};
    data.map((data) => {
      const mdate = moment(data['sport_event'][date_param]).format(format);
      if (!dateObj[mdate]) dateObj[mdate] = [];
      dateObj[mdate].push(data);
    });
    return Object.keys(dateObj).map(key => ({ key, data: dateObj[key] }));
  }

  // Soccer Fixtures Date Slider
  // tslint:disable-next-line: member-ordering
  customOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: false,
    navSpeed: 150,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7,
        slideBy: 7
      },
      612: {
        items: 7,
        slideBy: 7
      }
    },
    nav: true
  };

}

