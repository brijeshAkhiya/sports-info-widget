import { Component, OnInit } from '@angular/core';


import { CommonService } from '@providers/common-service'
import { SportsService } from '@providers/sports-service'

import * as fromRoot from "@app/app-reducer";
import { Store } from "@ngrx/store";

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
  sport: any;

  customOptions:any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.sport = 'cricket'
    this.getBannerPost();
    this.getPopularVideos();
  }

  //slide change Event
  changeSlide(event){
    this.sport = event.slides[0].id
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
