import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';
import * as moment from 'moment';

import { SportsService } from "@providers/sports-service";


import * as fromRoot from "@app/app-reducer";
import * as Kabaddi from "@store/kabaddi/kabaddi.actions";
import * as Cricket from "@store/cricket/cricket.actions";
import { Store } from "@ngrx/store";


@Component({
  selector: 'app-fixtures-sidebar-widget',
  templateUrl: './fixtures-sidebar-widget.component.html',
  styleUrls: ['./fixtures-sidebar-widget.component.css']
})
export class FixturesSidebarWidgetComponent implements OnInit, OnChanges {
  @Input() sport: any
  fixturesdata: any
  resultsdata: any
  loader: boolean;
  paramSoccer: any

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fixturesdata = [];
    this.resultsdata = [];
    this.loader = true;
    if (this.sport == 'cricket') {
      this.store.dispatch(new Cricket.LoadCricketFixtures())
      this.store.dispatch(new Cricket.LoadCricketResults())
      this.store.select('Cricket').subscribe((data: any) => {
        this.fixturesdata = data.fixtures;//(Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) ? data.fixtures.items : [];
        this.resultsdata = data.results; //(Object.entries(data.results).length > 0 && data.results.items.length > 0) ? data.results.items : [];
        this.loader = false;
      })
    }
    else if (this.sport == 'kabaddi') {
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
      this.store.dispatch(new Kabaddi.LoadKabaddiResults())
      this.store.select('Kabaddi').subscribe((data: any) => {
        console.log("subscribe");
        console.log(data);

        if (data) {
          this.loader = false;
        }
        // if (data.fixtures.length > 0) {
        console.log('after effects', data.fixtures);
        this.fixturesdata = (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) ? data.fixtures.items : [];
        // }
        // if (data.results.length > 0) {
        console.log('after effects', data.results);
        this.resultsdata = (Object.entries(data.results).length > 0 && data.results.items.length > 0) ? data.results.items : [];
        // }
      })
    }
    else if (this.sport == 'soccer') {
      this.paramSoccer = { loading: false, loadmore: false, data: [],results:[],fixtures:[] }
      this.getSoccerData();
      this.loader = false
    }
  }

  getSoccerData() {
    this.paramSoccer.loading = true;
    this.sportsService
      .getSoccerDailySummary('2019-08-21')
      .subscribe((res: any) => {
        this.paramSoccer.loading = false;
        if (res.data && res.data.summaries && res.data.summaries.length > 0) {
          this.paramSoccer.fullData = res.data.summaries;
          this.fixturesdata = res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started')
          this.resultsdata = res.data.summaries.filter((match) => match.sport_event_status.status == 'closed')
        }
      }, (error) => {
        this.paramSoccer.loading = false;
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




}
