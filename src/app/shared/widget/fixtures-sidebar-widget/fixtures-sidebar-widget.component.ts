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
      this.getSoccerData();
    }
  }

  getSoccerData() {
    let today = new Date();
    this.loader = true
    this.sportsService
      .getSoccerDailySummary(this.convertDate(today))
      .subscribe((res: any) => {
        this.loader = false
        if (res.data && res.data.summaries && res.data.summaries.length > 0) {
        this.fixturesdata = res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started' && match.sport_event.sport_event_context.category.name == 'International Clubs')
        if(this.fixturesdata.length == 0){
        this.fixturesdata = res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started')
        console.log('fixtures data',this.fixturesdata);
        
        }
          this.resultsdata = res.data.summaries.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event.sport_event_context.category.name == 'International Clubs')
        }
      }, (error) => {
        this.loader = false
      });
  }

  filterSoccerData(data, type, category, season) {
    if (type == 'fixture') {
      return data.filter((match) => match.sport_event_status.status == 'not_started' && match.sport_event.sport_event_context.category.name == category, '')
    }
    else {
      return data.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event.sport_event_context.category.name == category, '')
    }
  }

  convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split('');
    var ddChars = dd.split('');
    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }





}
