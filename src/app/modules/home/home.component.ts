import { Component, OnInit } from '@angular/core';

import { CommonService } from '@providers/common-service'
import { SportsService } from '@providers/sports-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  highlightImage: Number = 0;
  highlightImageInterval;
  popularvideos = [];
  banners = [];

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
        this.initHighlightInterval(0);
    });
  }
  /** Highlight Blog in interval */
  initHighlightInterval(initValue){
    let i = initValue;        
    this.highlightImageInterval = setInterval(() => {
      this.highlightImage = i;
      i = (this.banners.length - 1 == i) ? 0 : i+1;
    }, 3000 ); 
  }  

  /** Stop Highlight Blog on mouseover */
  stopHighlightInterval(highlightIndex){
    this.highlightImage = highlightIndex;
    clearInterval(this.highlightImageInterval);
  }

  //get popular videos
  getPopularVideos() {
    this.sportsService.getpopularpost({eType: "Video"}).subscribe((res:any) => {
      if (res.data) 
        this.popularvideos = res.data;
    });
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    clearInterval(this.highlightImageInterval);
  }

}
