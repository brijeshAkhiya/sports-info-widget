import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  options: any = { reqParams: { nStart: 0, nLimit: 10 } }
  blog_title = '';

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.activatedroute);

    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {

    let blogState = window.history.state;
    /** Search post  */
    if(this.activatedroute.routeConfig.path == 'search/:key'){      
      this.options.reqParams.sSearch = this.activatedroute.snapshot.url[1].path ? this.activatedroute.snapshot.url[1].path : blogState.sSearch;
      this.blog_title = 'Search Results';
      this.options.reqParams.nLimit = 5;
      if(blogState.data)
        this.options.data = blogState.data;
    }
    /** Article and Videos Blog post  */
    else if (this.activatedroute.routeConfig.path == 'article' || this.activatedroute.routeConfig.path == 'video') {
      if(this.activatedroute.routeConfig.path == 'video'){
        this.blog_title = 'Videos' ;
        this.options.reqParams.eType =  'Video'
      }else{
        this.blog_title = 'Articles' ;
      }
      if (typeof blogState.type != 'undefined'){
        this.options.reqParams.eType = (this.activatedroute.routeConfig.path == 'video') ? 'Video' : 'Article' 
        this.options.type = blogState.type
      }
    }
    /** Admin Blogs */
    else if (this.activatedroute.routeConfig.path == 'blog') {
      this.blog_title = 'Blogs';
      this.options.type = this.options.card_type = 'admin';
    }
  }
}
