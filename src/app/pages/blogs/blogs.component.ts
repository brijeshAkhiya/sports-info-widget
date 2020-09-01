import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { SportsService } from '@providers/sports-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  options: any = { reqParams: { nStart: 0, nLimit: 10 }, data: [] };
  blog_title = '';
  widgetblogs: any;
  searchkey;
  prev;
  noresults: boolean = false;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private sportsService: SportsService,
    private translateService: TranslateService,
    private cd: ChangeDetectorRef
  ) {

    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.getRecentArticles();
    let blogState = window.history.state;

    /** Search post  */
    if (this.activatedroute.routeConfig.path == 'search/:key') {
      this.options.reqParams.sSearch = this.activatedroute.snapshot.url[1].path ? this.activatedroute.snapshot.url[1].path : blogState.sSearch;
      this.blog_title = this.translateService.get('Blog_Module2.Search_results')['value'];
      this.options.reqParams.nLimit = 10;
      if (blogState.data)
        this.options.data = blogState.data;
    } else if (this.activatedroute.routeConfig.path == 'article' || this.activatedroute.routeConfig.path == 'video') {
      /** Article and Videos Blog post  */
      if (this.activatedroute.routeConfig.path == 'video') {
        this.blog_title = this.translateService.get('Blog_Module.Videos')['value'];
        this.options.reqParams.eType = 'Video';
      } else {
        this.blog_title = this.translateService.get('Blog_Module.Articles')['value'];
      }
      if (typeof blogState.type != 'undefined') {
        this.options.reqParams.eType = (this.activatedroute.routeConfig.path == 'video') ? 'Video' : 'Article';
        this.options.type = blogState.type;
      }
    } else if (this.activatedroute.routeConfig.path == 'blog') {
      this.blog_title = this.translateService.get('Blog_Module.blogs')['value'];
      this.options.type = this.options.card_type = 'admin';
    }

  }


  getRecentArticles() {
    let data = {
      nstart: 0,
      nLimit: 10
    };
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res['data']) {
        this.widgetblogs = res['data'];
      }
    });
  }

  valuechange($e) {
    if (this.searchkey && this.searchkey.length > 2 && (this.searchkey != this.prev)) {
      this.search();
      this.prev = this.searchkey;
    } else if (this.searchkey == '')
      this.options.data = [];
  }


  // search api call
  search() {
    // console.log('search');
    // console.log(this.options);

    if (this.searchkey.trim()) {
      let data = {
        sSearch: this.searchkey,
        nLimit: 10,
        nStart: 0
      };
      this.noresults = false;
      this.sportsService.getsearchresult(data).subscribe((res: any) => {
        // console.log(res);

        this.options.data = [];
        if (res.data.length > 0) {
          res.data.forEach(element => {
            this.options.data.push(element);
          });
        }
        // this.options.data.push(res.data[0]);
        this.cd.detectChanges();
        // if (res['data'].length > 0) {
        //   this.options.data = res['data'];
        // } else {
        //   this.noresults = true;
        // }
        // console.log(this.options.data);
      });
    }
  }
}
