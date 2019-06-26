import { Component, OnInit } from '@angular/core';

import { CommonService } from '@providers/common-service'
import { SportsService } from '@providers/sports-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banners = [];
  highlightImage: Number = 0;
  popularvideos = [];

  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
  ) { }

  ngOnInit() {
    this.getBannerPost();
    this.getPopularVideos();
  }

  //get banner posts
  getBannerPost() {
    this.sportsService.getbannerpost().subscribe((res:any) => {
      if (res.data) 
        this.banners = res.data; 
    });
  }

  //get popular videos
  getPopularVideos() {
    this.sportsService.getpopularpost({eType: "Video"}).subscribe((res:any) => {
      if (res.data) 
        this.popularvideos = res.data;
    });
  }
}
