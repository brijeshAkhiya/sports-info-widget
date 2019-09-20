import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  @ViewChild('gallery') public gallery: CarouselComponent;
  params;
  paramsData: any;
  filter: any = {};
  customDate;
  model: any;

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    this.paramsData = {
      loading: false, loadmore: false, data: [],
      selectedDate: { year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD'), monthStr: moment().format('MMM') },
      filterCategory: []
    };
    this.loadDate(this.paramsData.selectedDate);
    this.getBasketballDailySchedule();
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
        this.gallery.to(this.paramsData.selectedDate.day.toString());
    });
  }
  selectDate(day) {
    this.paramsData.data = [];
    this.paramsData.selectedDate.day = this.checkDateWithZero(day);
    this.loadDate(this.paramsData.selectedDate);
    this.getBasketballDailySchedule();
  }
  dateChange($e) {
    this.paramsData.data = [];
    this.paramsData.selectedDate = {
      year: this.model.year,
      month: this.checkDateWithZero(this.model.month),
      day: this.checkDateWithZero(this.model.day),
      monthStr: moment(`${this.model.year}-${this.checkDateWithZero(this.model.month)}-${this.checkDateWithZero(this.model.day)}`).format('MMM')
    };
    this.loadDate(this.paramsData.selectedDate);
    this.getBasketballDailySchedule();
  }
  checkDateWithZero(value) {
    return (value != 0 && value.toString().length == 1) ? '0' + value : value;
  }
  getBasketballDailySchedule() {
    this.paramsData.loading = true;
    this.sportsService
      .getBasketballDailySummary(moment(`${this.paramsData.selectedDate.year}-${this.paramsData.selectedDate.month}-${this.paramsData.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {
        this.paramsData.loading = false;
        if (res) {
          this.paramsData.data = this.commonService.sortArr(res.data.games, 'Do MMMM YYYY', 'scheduled', 'asc');
        }
        console.log(this.paramsData.data);

      },
        error => this.paramsData.loading = false);
  }

  getSeasons() {
    this.paramsData.loading = true;
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      this.paramsData.loading = false;
      if (res.data && res.data.seasons) {
        this.paramsData.seasons = res.data.seasons;
        if (res.data.seasons) {
          this.filter.year = this.paramsData.seasons[this.paramsData.seasons.length - 1].year;
          this.filter.type = this.paramsData.seasons[this.paramsData.seasons.length - 1].type.code;
        }
        this.getBasketballSchedule();
      }
    });
  }

  getBasketballSchedule() {
    this.paramsData.loading = true;
    this.sportsService.getBasketballSummary(this.filter.year, this.filter.type).subscribe((res: any) => {
      this.paramsData.loading = false;
      if (res) {
        this.paramsData.data = this.commonService.sortArr(res.data.games, 'Do MMMM YYYY', 'scheduled', 'asc');
      }
    },
      error => this.paramsData.loading = false);
  }

  filterData(params) {
    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    if (params.type)
      this.filter.category = params.category;
    this.getBasketballSchedule();
  }

}
