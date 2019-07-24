import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { Actions } from '@ngrx/effects'
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
    private actions: Actions,
    public cricketService: CricketService
  ) { }


  ngOnInit() {
    this.store.select('CricketFixtures').subscribe((data: any) => {
      this.matchfixtures = data.cricketfixtures
    })

    this.store.select('CricketResults').subscribe((data: any) => {
      this.matchresults = data.cricketresults
    })

  }



}
