import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

import * as Kabaddi from "@store/kabaddi/kabaddi.actions";
import { Store } from "@ngrx/store";
import * as fromRoot from "@app/app-reducer";

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  tournamentid;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'cricket', 'tournament');
    // this.getFixtures();
    // this.loadData('fixture');
    // this.loadData('result');
    this.loadFromStore();
  }
  loadFromStore(){

    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures())
    this.store.dispatch(new Kabaddi.LoadKabaddiResults())
    this.store.select('Kabaddi').subscribe((data: any) => {
      if (data.fixtures.length > 0) {
        console.log('after effects', data.fixtures);
        this.paramsFixtures.data = this.commonService.sortArr(data.fixtures, 'Do MMMM YYYY', 'datestart', 'asc')
        this.paramsFixtures.loadmore = true;
      }
      if (data.results.length > 0) {
        console.log('after effects', data.results);
        this.paramsResults.data = this.commonService.sortArr(data.results, 'Do MMMM YYYY', 'datestart', 'desc')
        this.paramsResults.loadmore = true;
      }
    })
  }

  loadData(type) {
    if (type == 'fixture') {
      if (this.paramsFixtures.data && this.paramsFixtures.data.length > 0)
        return false;
      this.getFixtures();
    }
    else if (type == 'result') {
      if (this.paramsResults.data && this.paramsResults.data.length > 0)
        return false;
      this.getResults();
    }
  }

  getFixtures() {
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


  getResults() {
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
      this.getFixtures();
    }
    else if (type == 'result') {
      this.paramsResults.reqParams.page += 1;
      this.getResults();
    }
  }
}
