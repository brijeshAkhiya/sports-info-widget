import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';
import * as moment from 'moment';

import { SportsService } from "@providers/sports-service";

import * as fromRoot from "@app/app-reducer";
import * as Kabaddi from "@store/kabaddi/kabaddi.actions";
import * as Cricket from "@store/cricket/cricket.actions";
import * as Soccer from "@store/soccer/soccer.actions";
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
        console.log(this.sport)
        if(this.sport == 'cricket'){
          if (data) {
            this.loader = data.loader;
          }
          this.fixturesdata = data.fixtures;//(Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) ? data.fixtures.items : [];
          this.resultsdata = data.results; //(Object.entries(data.results).length > 0 && data.results.items.length > 0) ? data.results.items : [];
        }
      })
    }
    else if (this.sport == 'kabaddi') {
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
      this.store.dispatch(new Kabaddi.LoadKabaddiResults())
      this.store.select('Kabaddi').subscribe((data: any) => {
        console.log("subscribe");
        if(this.sport == 'kabaddi'){
          if (data) {
            this.loader = data.loader;
          }
          this.fixturesdata = (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) ? data.fixtures.items : [];
          this.resultsdata = (Object.entries(data.results).length > 0 && data.results.items.length > 0) ? data.results.items : [];
        }
      })
    }
    else if (this.sport == 'soccer') {
      this.store.dispatch(new Soccer.LoadSoccerFixtures())
      this.store.select('Soccer').subscribe((data: any) => {
        console.log('data', data);
        console.log('loader', data.loader);
        if(this.sport == 'soccer'){
        if (data.fixtures) {
          this.loader = data.loader
        }
        if (data.fixtures && data.fixtures.length > 0) {
          this.fixturesdata = data.fixtures.filter((match) => match.sport_event_status.status == 'not_started' )
          // this.fixturesdata = data.fixtures.filter((match) => match.sport_event_status.status == 'not_started' && match.sport_event.sport_event_context && match.sport_event.sport_event_context.category && match.sport_event.sport_event_context.category.name == 'International Clubs')
          // if (this.fixturesdata.length < 4) {
          //   this.fixturesdata = this.fixturesdata.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'not_started' && match.sport_event.sport_event_context.category && match.sport_event.sport_event_context.category.name != 'International Clubs'))
          // }
          this.resultsdata = data.fixtures.filter((match) => match.sport_event_status.status == 'closed')
          // this.resultsdata = data.fixtures.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event.sport_event_context && match.sport_event.sport_event_context.category && match.sport_event.sport_event_context.category.name == 'International Clubs')
          // if (this.resultsdata.length < 4) {
          //   this.resultsdata = this.resultsdata.concat(data.fixtures.filter((match) => match.sport_event_status.status == 'closed' && match.sport_event.sport_event_context.category && match.sport_event.sport_event_context.category.name != 'International Clubs'))
          // }
        }
        }

      })

    }
  }
}
