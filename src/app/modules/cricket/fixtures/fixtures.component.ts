import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FixturesComponent implements OnInit {

  internationSchedule = [];
  domesticSchedule = [];

  constructor(
    private sportsService: SportsService,
    private cricketService: CricketService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getCricketSeries();
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


