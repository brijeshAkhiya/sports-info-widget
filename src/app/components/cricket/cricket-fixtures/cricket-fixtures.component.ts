import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../providers/sports-service';


@Component({
  selector: 'app-cricket-fixtures',
  templateUrl: './cricket-fixtures.component.html',
  styleUrls: ['./cricket-fixtures.component.css']
})
export class CricketFixturesComponent implements OnInit {
  cricketseries: any;
  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getCricketSeries();
  }


   //get current cricket series 

   getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res) => {
      if (res['data']) {
        this.cricketseries = res['data']
      }
    })
  }


}
