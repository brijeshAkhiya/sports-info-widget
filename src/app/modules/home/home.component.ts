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
  highlightImageInterval;
  popularvideos = [];
  recentPosts = [];

  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
  ) { }

  ngOnInit() {
    this.getBannerPost();
    this.getPopularVideos();
    this.getRecentPosts();
  }

  //get banner posts
  getBannerPost() {
    this.sportsService.getbannerpost().subscribe((res:any) => {
      if (res.data) 
        this.banners = res.data; 
        this.initHighlightInterval(0);
    });
  }
  initHighlightInterval(initValue){
    let i = initValue;        
    this.highlightImageInterval = setInterval(() => {
      this.highlightImage = i;
      i = (this.banners.length - 1 == i) ? 0 : i+1;
    }, 4000 ); 

  }  
  mouseover(highlightIndex){
    this.highlightImage = highlightIndex;
    clearInterval(this.highlightImageInterval);
  }
  mouseout(){
    this.initHighlightInterval(this.highlightImage)
  }

  //get popular videos
  getPopularVideos() {
    this.sportsService.getpopularpost({eType: "Video"}).subscribe((res:any) => {
      if (res.data) 
        this.popularvideos = res.data;
    });
  }

  //get recent posts
  getRecentPosts() {
    this.sportsService.getrecentpost({eType: "",nLimit: 10}).subscribe((res:any) => {
      if (res.data) {
        this.recentPosts = res.data;
      }
    });
  }

}
