import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  internationSchedule = [];
  domesticSchedule = [];

  constructor(
    private sportsService: SportsService,
    private cricketService: CricketService,
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
        this.internationSchedule = this.sortArr(this.internationSchedule);
        this.domesticSchedule = this.sortArr(this.domesticSchedule);
        console.log(this.internationSchedule)
      }
    });
  }

  sortArr(data) {
    let dateObj = {}
    data.map((data) => {
      let mdate = moment(data.start_date).format('MMMM YYYY');
      if (!dateObj[mdate]) 
        dateObj[mdate] = [];
      dateObj[mdate].push(data)        
    })
    return Object.keys(dateObj).map(month => ({ month, data: dateObj[month] }));
  }
}


