import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';

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
    private cricketService: CricketService, 
    public commonService: CommonService, 
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
        this.fixturesdata = data.fixtures
        this.resultsdata = data.results;
        this.loader = false;
      })
    }
    else if (this.sport == 'kabaddi') {
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
      this.store.dispatch(new Kabaddi.LoadKabaddiResults())
      this.store.select('Kabaddi').subscribe((data: any) => {
        console.log("subscribe");
        console.log(data);
         
        if(data){
          this.loader = false;
        }
        if (data.fixtures.length > 0) {
          console.log('after effects', data.fixtures);
          this.fixturesdata = data.fixtures
        }
        if (data.results.length > 0) {
          console.log('after effects', data.results);
          this.resultsdata = data.results
        }
      })
    }
  }

}
