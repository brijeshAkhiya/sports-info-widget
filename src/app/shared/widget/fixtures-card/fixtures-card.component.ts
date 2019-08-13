import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { distinctUntilChanged } from 'rxjs/operators';

import * as fromRoot from "@app/app-reducer";
import * as Kabaddi from "@store/kabaddi/kabaddi.actions";
import * as Cricket from "@store/cricket/cricket.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-fixtures-card',
  templateUrl: './fixtures-card.component.html',
  styleUrls: ['./fixtures-card.component.css']
})
export class FixturesCardComponent implements OnInit {
  @Input() sport: any
  @Input() title: any
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  paramSoccer:any
  customDate;
  model: any;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    if (this.sport == 'kabaddi') {
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
      this.store.dispatch(new Kabaddi.LoadKabaddiResults())
      this.store.select('Kabaddi').subscribe((data: any) => {
        if (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(data.fixtures.items, 'Do MMMM YYYY', 'datestart', 'asc'))
        }
        if (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0 && data.fixtures > this.paramsFixtures.reqParams.page)
          this.paramsFixtures.loadmore = true;
        else
          this.paramsFixtures.loadmore = true;

        if (Object.entries(data.results).length > 0 && data.results.items.length > 0) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(data.results.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        if (Object.entries(data.results).length > 0 && data.results.items.length > 0 && data.results.total_pages > this.paramsResults.reqParams.page)
          this.paramsResults.loadmore = true;
        else
          this.paramsResults.loadmore = true;
      })
    }
    else if (this.sport == 'cricket') {
      // this.getCricketSeries();
    }
    else if (this.sport == 'soccer') {
      this.paramSoccer = { loading: false, loadmore: false, data: [], fullData: [], 
        selectedDate: { year: moment().format('YYYY'), month : moment().format('MM'), day: moment().format('DD'), monthStr: moment().format('MMM')},
        filterCategory: [],
        selectedCategory: {name: 'All'}
      }
      this.loadDate(this.paramSoccer.selectedDate);
      this.getSoccerData();
    }
  }
  loadDate(current){
    this.customDate = new Array<number>(moment(`${current.year}-${current.month}-${current.day}`).daysInMonth()).fill(0, 0).map((x,i)=>i+1); 
  }
  dateChange($e){    
    this.paramSoccer.data = [];
    this.paramSoccer.selectedDate = { 
      year: this.model.year, month: this.model.month, day: this.model.day, 
      monthStr: moment(`${this.model.year}-${this.model.month}-${this.model.day}`).format('MMM') 
    };
    this.loadDate(this.paramSoccer.selectedDate);
    this.customOptions.startPosition = this.model.day;
    this.getSoccerData()
  }
  filter(category){
    let obj = {};
    this.paramSoccer.selectedCategory = category;
    if(category.name == 'All'){
      this.paramSoccer.fullData.map((data) => {
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
          obj[data.sport_event.sport_event_context.season.id].matches.push(data)
      })
    }else{
      this.paramSoccer.fullData.map((data) => {
        if(category.id == data.sport_event.sport_event_context.category.id){
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
          obj[data.sport_event.sport_event_context.season.id].matches.push(data)
        }
      })
    }
    this.paramSoccer.data =  Object.keys(obj).map(key => ({ key, data: obj[key] }));
  }

  getSoccerData(){
    window['moment'] = moment();
    this.paramSoccer.loading = true;
    this.sportsService
      .getSoccerDailySummary(moment(`${this.paramSoccer.selectedDate.year}-${this.paramSoccer.selectedDate.month}-${this.paramSoccer.selectedDate.day}`).format('YYYY-MM-DD'))
      .subscribe((res: any) => {     
        this.paramSoccer.loading = false;   
        if(res.data && res.data.summaries && res.data.summaries.length > 0){
          this.paramSoccer.fullData = res.data.summaries;
          let obj = {};
          let category = {};
          res.data.summaries.map((data) => {
            // Category for filter
            if (!category[data.sport_event.sport_event_context.category.id]) category[data.sport_event.sport_event_context.category.id] = data.sport_event.sport_event_context.category;

            if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
            obj[data.sport_event.sport_event_context.season.id].matches.push(data)
          })
          this.paramSoccer.data =  Object.keys(obj).map(key => ({ key, data: obj[key] }));
          this.paramSoccer.filterCategory =  Object.keys(category).map(key => ({ key, data: category[key] }));
          
        }
      }, (error) => {
        this.paramSoccer.loading = false;   
      });
  }

  loadKabaddi(type) {
    if (type == 'fixture') {
      if (this.paramsFixtures.data && this.paramsFixtures.data.length > 0)
        return false;
      this.getKabaddiFixtures();
    }
    else if (type == 'result') {
      if (this.paramsResults.data && this.paramsResults.data.length > 0)
        return false;
      this.getKabaddiResults();
    }
  }

  getKabaddiFixtures() {
    this.paramsFixtures.loading = true;
    this.sportsService.getKabaddiMatchList(this.paramsFixtures.reqParams.status, this.paramsFixtures.reqParams.per_page, this.paramsFixtures.reqParams.page).subscribe((res: any) => {
      this.paramsFixtures.loading = false;
      if (res.data && res.data.items) {
        this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'asc'));
      }
      if (res.data.total_pages > this.paramsFixtures.reqParams.page)
        this.paramsFixtures.loadmore = true;
      else
        this.paramsFixtures.loadmore = true;
    }, (error) => {
      this.paramsFixtures.loading = false;
    });
  }

  getKabaddiResults() {

    this.paramsResults.loading = true;
    this.sportsService
      .getKabaddiMatchList(this.paramsResults.reqParams.status, this.paramsResults.reqParams.per_page, this.paramsResults.reqParams.page)
      .subscribe((res: any) => {
        this.paramsResults.loading = false;
        if (res.data && res.data.items) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        if (res.data.total_pages > this.paramsResults.reqParams.page)
          this.paramsResults.loadmore = true;
        else
          this.paramsResults.loadmore = true;
      }, (error) => {
        this.paramsResults.loading = false;
      });
  }

  loadmore(type) {
    if (type == 'fixture') {
      this.paramsFixtures.reqParams.page += 1;
      this.getKabaddiFixtures();
    }
    else if (type == 'result') {
      this.paramsResults.reqParams.page += 1;
      this.getKabaddiResults();
    }
  }
  // Soccer Fixtures Date Slider
  customOptions: any = {
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
        items: 7,
      },
      612: {
        items: 7,
      }
    },
    nav: true
  }
}
