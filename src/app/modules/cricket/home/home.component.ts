import { Component, OnInit } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cricketseries = [];
  populartags = [];

  options = { reqParams : { eSport : 'Cricket'}, title : this.translateservice.get('Header_menu.Cricket')['value'], type:'sport' , id :'cricket'}

  constructor(
    private sportsService: SportsService,
    private translateservice:TranslateService
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
