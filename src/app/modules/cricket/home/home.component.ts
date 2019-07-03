import { Component, OnInit } from '@angular/core';

import { SportsService } from "@providers/sports-service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cricketseries = [];
  populartags = [];

  options = { reqParams : { eSport : 'Cricket'}, title : 'Cricket'}

  constructor(
    private sportsService: SportsService
  ) { }

  ngOnInit() {
  }


  //get current cricket series

  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res:any) => {
      if (res.data) {
        this.cricketseries = res.data;
      }
    });
  }

  //get popular cricket tags

  getPopularTags() {
    let data = {
      eSport: "Cricket"
    };
    this.sportsService.getpopulartags(data).subscribe((res:any) => {
      if (res.data) {
        this.populartags = res.data;
      }
    });
  }

}
