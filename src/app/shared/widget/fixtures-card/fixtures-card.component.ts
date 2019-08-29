import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

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
  
  @ViewChild('gallery') public gallery: CarouselComponent;

  @Input() sport: any
  @Input() title: any
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid : '' }
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid : '' }
  paramSoccer:any
  customDate;
  model: any;
  tournamentid:any;
  searchText:string;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    console.log(this.activatedroute.parent.snapshot.params.id);
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
      this.paramSoccer = { loading: false, loadmore: false, data: []}      
      if(typeof this.activatedroute.parent.snapshot.params.id != 'undefined'){
        this.paramsFixtures.tournamentid = this.paramsResults.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id ,'soccer','tournament');
        this.tournamentid = this.paramsResults.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id ,'soccer','tournament');
        this.getSoccerTournamentData(this.paramsFixtures.tournamentid);
        // this.getscoccerpointtable(this.paramsFixtures.tournamentid);
      }else{
        this.paramSoccer = { loading: false, loadmore: false, data: [], fullData: [], 
          selectedDate: { year: moment().format('YYYY'), month : moment().format('MM'), day: moment().format('DD'), monthStr: moment().format('MMM')},
          filterCategory: [],
          selectedCategory: {name: 'All'}
        }
        this.loadDate(this.paramSoccer.selectedDate);
        this.getSoccerData();
        console.log(this.paramsFixtures.tournamentid)
        // this.getscoccerpointtable(this.paramsFixtures.tournamentid);
      }
    }
  }
  loadDate(current){
    this.customDate = new Array<number>(moment(`${current.year}-${current.month}-${current.day}`).daysInMonth()).fill(0, 0).map((x,i)=>i+1); 
    if(this.gallery){ 
      var temp = this.gallery.slidesOutputData.slides.filter((slide) => parseInt(slide.id) == current.day)
      if(temp.length == 0 || this.gallery.slidesOutputData.slides.length > 7 )   
        this.gallery.to(current.day.toString());
    }
  }
  initialized($e){
    setTimeout(() => {
      if(this.gallery.slidesOutputData.slides.length > 7 )   
        this.gallery.to(this.paramSoccer.selectedDate.day.toString());
    }, );
  }
  selectDate(day){     
    this.paramSoccer.data = [];
    this.paramSoccer.selectedDate.day = day;
    this.loadDate(this.paramSoccer.selectedDate);
    this.getSoccerData()
  }
  dateChange($e){    
    this.paramSoccer.data = [];
    this.paramSoccer.selectedDate = { 
      year: this.model.year, month: this.model.month, day: this.model.day, 
      monthStr: moment(`${this.model.year}-${this.model.month}-${this.model.day}`).format('MMM') 
    };
    this.loadDate(this.paramSoccer.selectedDate);
    this.getSoccerData()
  }
  filter(category){
    let obj = {};
    this.paramSoccer.selectedCategory = category;
    if(category.name == 'All'){
      this.paramSoccer.fullData.map((data) => {
        if(data.sport_event.sport_event_context){
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
          obj[data.sport_event.sport_event_context.season.id].matches.push(data)
        }
      })
    }else{
      this.paramSoccer.fullData.map((data) => {
        if(data.sport_event.sport_event_context && category.id == data.sport_event.sport_event_context.category.id){
          if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
          obj[data.sport_event.sport_event_context.season.id].matches.push(data)
        }
      })
    }
    this.paramSoccer.data =  Object.keys(obj).map(key => ({ key, data: obj[key] }));
  }

  getSoccerData(){
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
            if(data.sport_event.sport_event_context){
              if (!category[data.sport_event.sport_event_context.category.id]) category[data.sport_event.sport_event_context.category.id] = data.sport_event.sport_event_context.category;

              if (!obj[data.sport_event.sport_event_context.season.id]) obj[data.sport_event.sport_event_context.season.id] = {'season' : data.sport_event.sport_event_context.season, matches : []};
              obj[data.sport_event.sport_event_context.season.id].matches.push(data)
            }
              
          })
          this.paramSoccer.data =  Object.keys(obj).map(key => ({ key, data: obj[key] }));
          this.paramSoccer.filterCategory =  Object.keys(category).map(key => ({ key, data: category[key] }));
          
        }
      }, (error) => {
        this.paramSoccer.loading = false;   
      });
  }

  getSoccerTournamentData(id){
    this.paramsFixtures.loading = true;
    this.paramsResults.loading = true;
    this.sportsService
      .getSoccerTournamentMatches(id)
      .subscribe((res: any) => {     
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;        
        if(res.data.summaries && res.data.summaries.length > 0){
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
    })
    let dateObj = {}
    data.map((data) => {
      let mdate = moment(data['sport_event'][date_param]).format(format);
      if (!dateObj[mdate]) dateObj[mdate] = [];
      dateObj[mdate].push(data)
    })
    return Object.keys(dateObj).map(key => ({ key, data: dateObj[key] }));
  }

  // getscoccerpointtable(tid){
  //   console.log('in')
  //   this.sportsService.getsoccerpointtable(tid).
  //           subscribe((res:any)=>{
  //             console.log(res.data)
  //           },err=>{
  //             console.log(err)
  //           });
  // }

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
  }

}
