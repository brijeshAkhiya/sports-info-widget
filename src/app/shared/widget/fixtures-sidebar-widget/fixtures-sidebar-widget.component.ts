import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';
import { SportsService } from '@app/shared/providers/sports-service';

import * as fromRoot from "@app/app-reducer";
import * as KabaddiFixtures from "@store/kabaddi-fixtures/kabaddi-fixtures.actions";
import * as KabaddiResults from "@store/kabaddi-results/kabaddi-results.actions";
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

  constructor(private cricketService: CricketService, private sportsService: SportsService, public commonService: CommonService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.sport == 'cricket') {
      this.store.select('CricketFixtures').subscribe((data: any) => {
        this.fixturesdata = data.cricketfixtures
      })
      this.store.select('CricketResults').subscribe((data: any) => {
        this.resultsdata = data.cricketresults
      })
    }
    else if (this.sport == 'kabaddi') {
      this.store.select('KabaddiFixtures').subscribe((data: any) => {
        if (data.kabaddifixtures.length > 0) {
          this.fixturesdata = data.kabaddifixtures
        }
        else {
          this.getKabaddiFixtures();
        }
      })
      this.store.select('KabaddiResults').subscribe((data: any) => {
        if (data.kabaddiresults.length > 0) {
          this.resultsdata = data.kabaddiresults
        }
        else {
          this.getKabaddiResults();
        }
      })
    }
  }


  getKabaddiFixtures() {
    let paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, data: [] }
    this.loader = true
    this.sportsService.getKabaddiMatchList(paramsFixtures.reqParams.status, paramsFixtures.reqParams.per_page, paramsFixtures.reqParams.page).subscribe((res: any) => {
      // paramsFixtures.loading = false;
      this.loader = false
      if (res.data && res.data.items) {
        paramsFixtures.data =res.data.items
        this.store.dispatch(new KabaddiFixtures.KabaddiFixtures(paramsFixtures.data))
      }
    }, (error) => {
      this.loader = false
      // paramsFixtures.loading = false;
    });
  }

  getKabaddiResults() {
    let paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, data: [] }
    this.loader = true
    this.sportsService.getKabaddiMatchList(paramsResults.reqParams.status, paramsResults.reqParams.per_page, paramsResults.reqParams.page).subscribe((res: any) => {
      this.loader = false
      if (res.data && res.data.items) {
        paramsResults.data =res.data.items
        this.store.dispatch(new KabaddiResults.KabaddiResults(paramsResults.data))
      }
    }, (error) => {
      this.loader = false
    });
  }



}
