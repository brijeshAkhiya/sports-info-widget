import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromRoot from "../../../app-reducer";

import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';


@Component({
  selector: 'app-cricket-sidebar',
  templateUrl: './cricket-sidebar.component.html',
  styleUrls: ['./cricket-sidebar.component.css']
})
export class CricketSidebarComponent implements OnInit {

  matchfixtures;
  matchresults;

  constructor(
    public commonService: CommonService,
    private store: Store<fromRoot.State>,
    public cricketService: CricketService
  ) { }

  ngOnInit() {
    this.store.select('SportsFixtures').subscribe((data: any) => {
      this.matchfixtures = data.fixtures
    })
    this.store.select('SportsResults').subscribe((data: any) => {
      this.matchresults = data.results
    })
  }

}
