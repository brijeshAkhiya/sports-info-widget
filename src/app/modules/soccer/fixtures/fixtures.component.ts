import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

import * as fromRoot from '@app/app-reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FixturesSoccerComponent implements OnInit {

  @ViewChild('gallery') public gallery: CarouselComponent;

  params;
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid: '' };
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid: '' };
  paramSoccer: any;
  customDate;
  model: any;
  tournamentid: any;
  searchText: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    const data: any = this.activatedroute.data;
    this.params = data.value;

    this.paramSoccer = {
      loading: false, loadmore: false, data: [], fullData: [],
      selectedDate: { year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD'), monthStr: moment().format('MMM') },
      filterCategory: [],
      selectedCategory: { name: 'All' }
    };
    this.loadDate(this.paramSoccer.selectedDate);
    this.getSoccerData();
  }
  loadDate(current) {
    this.customDate = new Array<any>(moment(`${current.year}-${current.month}-${current.day.toString()}`).daysInMonth()).fill(0, 0).map((x, i) => i + 1);
    console.log(this.gallery);

    if (this.gallery && this.gallery.slidesOutputData) {
      const temp = this.gallery.slidesOutputData.slides.filter((slide) => parseInt(slide.id) == current.day);
      if (temp.length == 0 || this.gallery.slidesOutputData.slides.length > 7)
        this.gallery.to(current.day.toString());
    }
  }
  initializedSlider($e) {
    setTimeout(() => {
      if (this.gallery.slidesOutputData.slides.length > 7)
        this.gallery.to(this.paramSoccer.selectedDate.day.toString());
    });
  }
  selectDate(day) {
    this.paramSoccer.data = [];
    this.paramSoccer.selectedDate.day = this.checkDateWithZero(day);
    this.loadDate(this.paramSoccer.selectedDate);
    this.getSoccerData();
  }
  dateChange($e) {
    this.paramSoccer.data = [];
    this.paramSoccer.selectedDate = {
      year: this.model.year,
      month: this.checkDateWithZero(this.model.month),
      day: this.checkDateWithZero(this.model.day),
      monthStr: moment(`${this.model.year}-${this.checkDateWithZero(this.model.month)}-${this.checkDateWithZero(this.model.day)}`).format('MMM')
    };
    this.loadDate(this.paramSoccer.selectedDate);
    this.getSoccerData();
  }
  checkDateWithZero(value) {
    return (value != 0 && value.toString().length == 1) ? '0' + value : value;
  }
  filter(category) {
    const obj = {};
    this.paramSoccer.selectedCategory = category;
    console.log(this.paramSoccer.selectedCategory);
    if (category.name == 'All') {
      this.paramSoccer.fullData.map((data) => {
        if (data.sport_event.sport_event_context) {
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = { 'season': data.sport_event.sport_event_context.season, matches: [] };
          obj[data.sport_event.sport_event_context.season.id].matches.push(data);
        }
      });
    } else {
      this.paramSoccer.fullData.map((data) => {
        if (data.sport_event.sport_event_context && category.id == data.sport_event.sport_event_context.category.id) {
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = { 'season': data.sport_event.sport_event_context.season, matches: [] };
          obj[data.sport_event.sport_event_context.season.id].matches.push(data);
        }
      });
    }
    this.paramSoccer.data = Object.keys(obj).map(key => ({ key, data: obj[key] }));
  }

  getSoccerData() {
    console.log('getSoccerData');

    this.paramSoccer.loading = true;
    this.sportsService
      .getSoccerDailySummary(moment(`${this.paramSoccer.selectedDate.year}-${this.paramSoccer.selectedDate.month}-${this.paramSoccer.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramSoccer.loading = false;
        if (res.data && res.data.summaries && res.data.summaries.length > 0) {
          this.paramSoccer.fullData = res.data.summaries;
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
          console.log(category);

          // category = this.commonService.sortByName(category, 'name');
          this.paramSoccer.data = Object.keys(obj).map(key => ({ key, data: obj[key] }));
          this.paramSoccer.filterCategory = Object.keys(category).map(key => ({ key, data: category[key] }));
          console.log(this.paramSoccer);

        }
      }, (error) => {
        this.paramSoccer.loading = false;
      });
  }

  getSoccerTournamentData(id) {
    this.paramsFixtures.loading = true;
    this.paramsResults.loading = true;
    this.sportsService
      .getSoccerTournamentMatches(id)
      .subscribe((res: any) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
        if (res.data.summaries && res.data.summaries.length > 0) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started'), 'Do MMMM YYYY', 'start_time', 'asc'));
          this.paramsResults.data = this.paramsResults.data.concat(this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'closed'), 'Do MMMM YYYY', 'start_time', 'desc'));
          // console.log(this.paramsFixtures.data);

        }
      }, (error) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
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
    lazyLoad: true,
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
