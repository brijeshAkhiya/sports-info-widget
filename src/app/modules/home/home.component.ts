import { Component, OnInit, ViewEncapsulation, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonService } from '@providers/common-service';
import { SportsService } from '@providers/sports-service';
import { isPlatformBrowser } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  highlightImage: Number = 0;
  popularvideos = [];
  banners = [];
  sport: any;
  private unsubscribe: Subject<void> = new Subject();
  highlightImageInterval;


  customOptions: any = {
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
      }
    },
    nav: true
  };


  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.sport = 'Cricket';
    this.getBannerPost();
    this.getPopularVideos();
  }

  /* //slide change Event */
  changeSlide(event) {
    if (event.slides.length > 0)
      this.sport = event.slides[0].id;
  }

  /* //get banner posts */
  getBannerPost() {
    this.sportsService.getbannerpost().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      if (res.data)
        this.banners = res.data;
      this.initHighlightInterval(0);
    });
  }
  /** Highlight Blog in interval */
  initHighlightInterval(initValue) {
    if (isPlatformBrowser(this.platformId)) {
      let i = initValue;
      this.highlightImageInterval = setInterval(() => {
        this.highlightImage = i;
        i = (this.banners.length - 1 === i) ? 0 : i + 1;
      }, 3000);
    }
  }

  /** Stop Highlight Blog on mouseover */
  stopHighlightInterval(highlightIndex) {
    this.highlightImage = highlightIndex;
    if (this.highlightImageInterval) clearInterval(this.highlightImageInterval);

  }

  /* //get popular videos */
  getPopularVideos() {
    this.sportsService.getpopularpost({ eType: 'Video', bRemoveBannerPosts: true }).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      if (res.data)
        this.popularvideos = res.data;
    });
  }

  ngOnDestroy() {
    if (this.highlightImageInterval) clearInterval(this.highlightImageInterval);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
