import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "angularx-social-login";

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';

import * as fromRoot from '../../../app-reducer'
import * as Auth from "@store/auth/auth.actions";

import { LoginModalComponent } from '../../../shared/widget/login-modal/login-modal.component';
import { Meta } from '@angular/platform-browser';

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
  isAuth$: boolean;
  socialUser: any;

  constructor(
    private router: Router,
    private meta: Meta,
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    private modalService: NgbModal,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.store.select('auth').subscribe((data) => {
      this.isAuth$ = data.isAuthenticated
    });
    let url: any = this.activatedroute.url;
    this.previewtype = (url.value[0].path == "blog-preview") ? 'preview' : 'detail';
    if (window.history.state && window.history.state.id) {
      this.getBlogview(window.history.state.id);
    }
    else if (this.activatedroute.snapshot.params.slug)
      this.getBlogview(this.activatedroute.snapshot.params.slug);

    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
    });

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
        // this.initSEOTags();
        this.getPopularArticles();
        // let type = (this.previewtype == "detail") ? this.url.value[0].path : this.url.value[1].path;
        // if (type.toUpperCase() != this.blogdata.eType.toUpperCase())
        //   this.router.navigate(['/page-not-found'])

        if (this.previewtype == 'detail')
          this.updatePostCount(this.blogdata._id)

        this.getBlogComments(this.blogdata._id, this.initBlogParams(this.blogdata._id));
      }, (error) => {
        if (error['error'].status == 500 || error['error'].status == 400) {
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

  initSEOTags() {
    this.meta.updateTag({ name: 'title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'description', content: this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info' });
    this.meta.updateTag({ name: 'topic', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'subject', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'keywords', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ property: 'og:title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ property: 'og:type', content: this.blogdata.eType ? this.blogdata.eType : 'Sports.info' });
    this.meta.updateTag({ property: 'og:description', content: this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info' });
    this.meta.updateTag({ name: 'twitter:title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'twitter:description', content: this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info' });
    this.meta.updateTag({ name: 'twitter:image', content: this.commonService.s3Url + this.blogdata.sImage ? this.blogdata.sImage : '' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    // this.meta.updateTag({ property: 'twitter:card', content: data['twitter:card'] ? data['twitter:card'] : 'Sports.info' });
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
        }, (error: any) => {
          if (error.status == 401) {
            console.log('status', error);
            this.store.dispatch(new Auth.SetUnauthenticated());
            this.authService.signOut();
            localStorage.removeItem('userT');
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
        setTimeout(() => {
          this.isNocomment = false
        }, 3000);
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
    let url = `${this.commonService.siteUrl}${this.blogdata.eType.toLowerCase()}/${this.blogdata.sSlug}`;
    if (platform == 'facebook') {
      window.open(`http://www.facebook.com/sharer.php?u=${url}`, '_blank');
    }
    else if (platform == 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=&text=${url}`, '_blank');
    }
    else {
      window.open(`http://twitter.com/share?text=${this.blogdata.sTitle} !!! &url=${url}&hashtags=SportsDotinfo,Cricketblogs,sportslatest`, '_blank')
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
      nLimit: 10,
      aIds: this.blogdata.aIds
    };
    this.sportsService.getrelatedpost(data).subscribe((res: any) => {
      if (res["data"]) {
        this.widgetblogs = res.data.filter((blog) => blog._id != this.blogdata._id);
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

  //open login modal 
  openmodal() {
    this.modalService.open(LoginModalComponent);
  }

}
