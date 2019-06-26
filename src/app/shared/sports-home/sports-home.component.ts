import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { SportsService } from "@providers/sports-service";

@Component({
  selector: 'app-sports-home',
  templateUrl: './sports-home.component.html',
  styleUrls: ['./sports-home.component.css']
})
export class SportsHomeComponent implements OnInit {

  @Input() options;
  @Input() page_type;
  @Input() blog_type;
  private tabSet: any;

  @ViewChild(NgbTabset) set content(content: ViewContainerRef) {
    this.tabSet = content;
  };

  popularArticlesParams:any = { nStart: 0, nLimit: 10}
  recentArticlesParams:any = { nStart: 0, nLimit: 10, eSort: 'Latest'}
  videoArticlesParams:any = { nStart: 0, nLimit: 10, eType: 'Video'}
  popularArticles = [];
  recentArticles = [];
  isLoading: boolean = false;

  constructor(
    private sportsService: SportsService
    ) { 
  }

  ngOnInit() {     
    console.log(this.options)
    if(this.options){
      this.popularArticlesParams =  {...this.popularArticlesParams, ...this.options.reqParams};
      this.recentArticlesParams =  {...this.recentArticlesParams, ...this.options.reqParams};
      this.videoArticlesParams =  {...this.videoArticlesParams, ...this.options.reqParams};

      console.log(this.recentArticlesParams)

      if(this.options.reqParams.aIds)
        this.getRelatedPosts();
      else if(this.options.page_type == 'home' && this.options.blog_type !='recent')
        this.getPopularArticles();
      else
        this.getRecentArticles();

    }
  }
  
  beforeChange($event: NgbTabChangeEvent) {
  }

  //get popular posts
  getPopularArticles() {
    this.isLoading = true;
    this.sportsService.getpopularpost(this.popularArticlesParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data) {
        this.popularArticles = this.popularArticles.concat(res.data);
      }
    });
  }

  //get Recent posts
  getRecentArticles() {
    this.isLoading = true;
    this.sportsService.getrecentpost(this.recentArticlesParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data) {
        this.recentArticles = this.recentArticles.concat(res.data);
      }
    });
  }

  //get related posts
  getRelatedPosts() {
    this.isLoading = true;
    this.sportsService.getrelatedpost(this.popularArticlesParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data) {
        this.popularArticles = this.popularArticles.concat(res.data);
      }
    });
  }



}
