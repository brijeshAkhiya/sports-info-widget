import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app-reducer';

import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-cricket-fixtures-view',
  templateUrl: './cricket-fixtures-view.component.html',
  styleUrls: ['./cricket-fixtures-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CricketFixturesViewComponent implements OnInit {

  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;
  selectedTab;

  constructor(
    private commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    let fromtype = this.activatedroute.snapshot.params.type;
    if (fromtype == 'fixtures') {
      this.selectedTab = 'upcoming';
      this.getMatchFixtures();
    } else if (fromtype == 'results') {
      this.selectedTab = 'results';
      this.getMatchResults();
    }
  }
  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    this.loadingFixture = true;
    this.store.select('Cricket').subscribe((res) => {
      this.loadingFixture = false
      this.matchfixtures = this.commonService.sortArr(res.fixtures, 'Do MMMM YYYY', 'scheduled', 'asc')
    })
  }

  //get 3 days results -HOME
  getMatchResults() {
    this.loadingResult = true;
    this.store.select('Cricket').subscribe((res) => {
      this.loadingResult = false
      this.matchresults = this.commonService.sortArr(res.results, 'Do MMMM YYYY', 'scheduled', 'desc')
    })
  }
}
