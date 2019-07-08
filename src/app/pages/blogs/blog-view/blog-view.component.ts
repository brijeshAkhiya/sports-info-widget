import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit {

  isLoadMoreComments: boolean = true;
  blogdata: any;
  previewtype: any;
  blogcomments = [];
  commentsParam: any = { nStart: 0, nLimit: 4 }
  usercommentvalue = ''
  isloggedin: boolean = true;
  isplay: boolean = false
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  widgetblogs: any;
  hideBtn: boolean;
  isNocomment: boolean;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    console.log('in blogview');
    console.log('state::blogvieww', window.history.state);
    this.getPopularArticles();
    let url: any = this.activatedroute.url;
    this.previewtype = (url.value[0].path == "blog-preview") ? 'preview' : 'detail';
    if (window.history.state && window.history.state.id) {
      this.getBlogview(window.history.state.id);
    }
    else if (this.activatedroute.snapshot.params.slug)
      this.getBlogview(this.activatedroute.snapshot.params.slug);
  }


  ngAfterViewInit() {
    /** for load social media widgets */
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    const ngP = 'https';
    // Twitter
    ngJs = document.createElement('script');
    ngJs.id = 'twitter-wjs';
    ngJs.src = ngP + '://platform.twitter.com/widgets.js';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);

    // Instagram
    ngJs = document.createElement('script');
    ngJs.src = ngP + '://platform.instagram.com/en_US/embeds.js';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);

    // Facebook
    ngJs = document.createElement('script');
    ngJs.src = ngP + '://connect.facebook.net/nl_NL/sdk.js#xfbml=1&amp;version=v3.3';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);
  }


  getBlogview(id) {
    if (id) {
      this.sportsService.getblogview(id).subscribe((res: any) => {
        this.blogdata = res.data;
        // let type = (this.previewtype == "detail") ? this.url.value[0].path : this.url.value[1].path;
        // if (type.toUpperCase() != this.blogdata.eType.toUpperCase())
        //   this.router.navigate(['/page-not-found'])

        if (this.previewtype == 'detail')
          this.updatePostCount(this.blogdata._id)

        this.getBlogComments(this.blogdata._id, this.initBlogParams(this.blogdata._id));
      }, (error) => {
        if (error['error'].status == 500) {
          this.router.navigate(['/page-not-found'])
        }
      });
    }
  }

  //update post view count
  updatePostCount(id) {
    if (id) {
      this.sportsService.updatepostviewcount(id).subscribe(res => { });
    }
  }


  //video play event 
  videoplay() {
    this.isplay = true
    this.videoplayer.nativeElement.play();
  }

  clicksubmit() {
    if (this.usercommentvalue.trim()) {
      if (localStorage.getItem('userT')) {
        this.isloggedin = true
        this.isNocomment = false
        let data = {
          iPostId: this.blogdata._id,
          sComment: this.usercommentvalue
        }
        this.sportsService.addusercomment(data).subscribe((res: any) => {
          if (res) {
            this.usercommentvalue = ''
            this.getBlogComments(this.blogdata._id, { iPostId: this.blogdata._id, nStart: 0, nLimit: this.blogcomments.length > 4 ? this.blogcomments.length : 4 });
          }
        })
      }
      else {
        this.isloggedin = false
        setTimeout(() => {
          this.isloggedin = true
        }, 3000);
      }
    }
    else {
      if (localStorage.getItem('userT')) {
        this.isloggedin = true
        this.isNocomment = true
      }
      else {
        this.isloggedin = false
        setTimeout(() => {
          this.isloggedin = true
        }, 3000);
      }
    }

  }

  //sharable link 
  sharablelink(platform) {
    let url = `${this.commonService.siteUrl}blog/${this.blogdata._id}/${this.blogdata.sSlug}`;
    if (platform == 'facebook') {
      window.open(`http://www.facebook.com/sharer.php?u=${url}`, '_blank');
    }
    else if (platform == 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=&text=${url}`, '_blank');
    }
    else {
      window.open(`http://twitter.com/share?text=This is our new blog !!! &url=${url}&hashtags=Sports.info,Cricketblogs,sportslatest`, '_blank')
    }
  }


  initBlogParams(id) {
    this.commentsParam.iPostId = id;
    this.commentsParam.nStart = this.blogcomments.length;
    return this.commentsParam;
  }

  viewmorecomments() {

    this.sportsService.getblogcommnets(this.initBlogParams(this.blogdata._id)).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        this.blogcomments = this.blogcomments.concat(res.data)
        if (this.commentsParam.nLimit > res.data.length)
          this.isLoadMoreComments = false;
      } else {
        this.isLoadMoreComments = false;
      }
    });
    //  this.getBlogComments(this.blogdata._id,this.initBlogParams(this.blogdata._id))
  }

  getPopularArticles() {
    let data = {
      nstart: 0,
      nLimit: 10
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.widgetblogs = res["data"];
      }
    });
  }

  //to get blog comments
  //to get blog comments
  getBlogComments(id, data) {
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          this.blogcomments = res.data
          if (this.commentsParam.nLimit > res.data.length)
            this.isLoadMoreComments = false;
        } else {
          this.isLoadMoreComments = false;
        }
      });
    }
  }

}
