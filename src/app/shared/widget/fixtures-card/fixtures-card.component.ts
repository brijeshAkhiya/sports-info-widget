import { Component, OnInit, Input } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-fixtures-card',
  templateUrl: './fixtures-card.component.html',
  styleUrls: ['./fixtures-card.component.css']
})
export class FixturesCardComponent implements OnInit {
  @Input() sport: any
  @Input() title: any
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  internationSchedule = [];
  domesticSchedule = [];

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
  ) { }

  ngOnInit() {
    if (this.sport == 'kabaddi') {
      this.loadKabaddi('fixture')
      this.loadKabaddi('result')
    }
    else if (this.sport == 'cricket') {
      this.getCricketSeries();
    }
  }

  loadKabaddi(type) {
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

  //get current cricket series 
  getCricketSeries() {
    this.sportsService.getcricketfixtures().pipe(distinctUntilChanged()).subscribe((res: any) => {
      if (res.data) {
        let cricketseries = res.data;
        cricketseries.map((data) => {
          if (data.category == 'International')
            this.internationSchedule.push(data);
          else
            this.domesticSchedule.push(data)
        });
        this.internationSchedule = this.commonService.sortArr(this.internationSchedule, 'MMMM YYYY', 'start_date', 'desc');
        this.domesticSchedule = this.commonService.sortArr(this.domesticSchedule, 'MMMM YYYY', 'start_date', 'desc');
      }
    });
  }

}
