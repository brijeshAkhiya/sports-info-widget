import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from '@providers/common-service';

import * as fromRoot from '@app/app-reducer';
import * as Kabaddi from '@store/kabaddi/kabaddi.actions';
import * as Cricket from '@store/cricket/cricket.actions';
import * as Soccer from '@store/soccer/soccer.actions';
import * as Basketball from '@store/basketball/basketball.actions';
import * as Hockey from '@store/hockey/hockey.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-fixtures-sidebar-widget',
  templateUrl: './fixtures-sidebar-widget.component.html',
  styleUrls: ['./fixtures-sidebar-widget.component.css']
})
export class FixturesSidebarWidgetComponent implements OnInit, OnChanges {
  @Input() sport: any;
  fixturesdata: any;
  resultsdata: any;
  loader: boolean;

  constructor(
    public commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fixturesdata = [];
    this.resultsdata = [];
    this.loader = true;
    if (this.sport === 'Cricket') {
      this.store.dispatch(new Cricket.LoadCricketFixtures());
      this.store.dispatch(new Cricket.LoadCricketResults());
      this.store.select('Cricket').subscribe((data: any) => {
        if (this.sport === 'Cricket') {
          if (data) {
            this.loader = data.loader;
          }
          this.fixturesdata = data.fixtures;
          this.resultsdata = data.results;
        }
      });
    } else if (this.sport === 'Kabaddi') {
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
      this.store.dispatch(new Kabaddi.LoadKabaddiResults());
      this.store.select('Kabaddi').subscribe((data: any) => {
        if (this.sport === 'Kabaddi') {
          if (data) {
            this.loader = data.loader;
          }
          this.fixturesdata = (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) ? data.fixtures.items : [];
          this.resultsdata = (Object.entries(data.results).length > 0 && data.results.items.length > 0) ? data.results.items : [];
        }
      });
    } else if (this.sport === 'Soccer') {
      this.store.dispatch(new Soccer.LoadSoccerFixtures());
      this.store.select('Soccer').subscribe((data: any) => {
        if (this.sport === 'Soccer') {
          if (data.fixtures) {
            this.loader = data.loader;
          }
          if (data.fixtures && data.fixtures.length > 0) {
            this.fixturesdata = data.fixtures.filter((match) => match.sport_event_status && match.sport_event_status.status === 'not_started');
            this.resultsdata = data.fixtures.filter((match) => match.sport_event_status && match.sport_event_status.status === 'closed');
          }
        }
      });
    } else if (this.sport === 'Basketball') {
      this.store.dispatch(new Basketball.LoadBasketballSchedule());
      this.store.select('Basketball').subscribe((data: any) => {
        if (this.sport === 'Basketball') {
          if (data.schedule) {
            this.loader = data.loader;
          }
          if (data.schedule && data.schedule.length > 0) {
            this.fixturesdata = data.schedule.filter((match) => match.status === 'scheduled');
            this.resultsdata = data.schedule.filter((match) => match.status === 'closed');
          }
        }
      });
    } else if (this.sport === 'Hockey') {
      this.store.dispatch(new Hockey.LoadHockeySchedule());
      this.store.select('Hockey').subscribe((data: any) => {
        if (this.sport === 'Hockey') {
          if (data.schedule) {
            this.loader = data.loader;
          }
          if (data.schedule && data.schedule.length > 0) {
            this.fixturesdata = data.schedule.filter((match) => match.sport_event_status.status === 'not_started');
            this.resultsdata = data.schedule.filter((match) => match.sport_event_status.status === 'closed');
          }
        }
      });
    }
  }
}
