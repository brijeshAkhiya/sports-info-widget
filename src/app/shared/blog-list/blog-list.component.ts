import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit, OnDestroy {

  @Input() options;
  @Input() sport;
  isLoading = false;
  isLoadMore = true;
  articles = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    if (this.options) {
      if (this.options.data && this.options.data.length > 0) {
        this.articles = (this.options.start) ? this.options.data.slice(this.options.start) : this.options.data;
        if (this.options.reqParams.nLimit > this.options.data.length)
          this.isLoadMore = false;
      } else
        this.getData();
    }
  }

  getData() {
    if (this.options.reqParams && this.options.reqParams.aIds)
      this.getRelatedPosts();
    else if (this.options.reqParams.type == 'popular' || this.options.type == 'popular')
      this.getPopularArticles();
    else if (this.options.type == 'writer' && typeof this.options.reqParams._id != 'undefined')
      this.getWriterPosts();
    else if (this.options.type == 'admin')
      this.getAdminPosts();
    else if (typeof this.options.reqParams.sSearch != 'undefined')
      this.getSearchPosts();
    else
      this.getArticles();
  }


  loadData(response) {
    this.isLoading = false;
    if (response.data.length > 0) {
      if (this.options.reqParams.nLimit > response.data.length)
        this.isLoadMore = false;
      this.articles = this.articles.concat(response.data);
      if (this.options.data && this.options.data.length > 0)
        this.options.data = this.options.data.concat(response.data);
    } else
      this.isLoadMore = false;
  }

  getSearchPosts() {
    this.isLoading = true;
    this.sportsService.getsearchresult(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.loadData(res);
    });
  }

  getAdminPosts() {
    this.isLoading = true;
    this.sportsService.getadminposts(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.loadData(res);
    });
  }


  /* //get popular posts */
  getPopularArticles() {
    this.isLoading = true;
    this.sportsService.getpopularpost(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.loadData(res);
    });
  }
  /* //get articles */
  getArticles() {
    this.isLoading = true;
    this.sportsService.getrecentpost(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.loadData(res);
    });
  }

  /* //get related posts */
  getRelatedPosts() {
    this.isLoading = true;
    this.sportsService.getrelatedpost(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.loadData(res);
    });
  }

  getWriterPosts() {
    this.isLoading = true;
    this.sportsService.getwriterprofile(this.options.reqParams).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.isLoading = false;
      if (res.data.posts && res.data.posts.posts.length > 0) {
        this.articles = this.articles.concat(res.data.posts.posts);
        if (this.options.reqParams.nLimit > res.data.posts.posts.length)
          this.isLoadMore = false;
      } else
        this.isLoadMore = false;
    });

  }
  loadmore() {
    this.options.reqParams.nStart = (this.options.data && this.options.data.length > this.articles.length) ? this.options.data.length : this.articles.length;
    this.getData();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
