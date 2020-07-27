// import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'angularx-social-login';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

import * as fromRoot from '../../../app-reducer';
import * as Auth from '@store/auth/auth.actions';

import { LoginModalComponent } from '../../../shared/widget/login-modal/login-modal.component';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { ObsEvent } from 'ng-lazyload-image/src/types';
import { userInfo } from 'os';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit, AfterViewInit {

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  isLoadMoreComments = true;
  blogdata: any;
  previewtype: any;
  blogcomments = [];
  commentsParam: any = { nStart: 0, nLimit: 4 };
  usercommentvalue = '';
  isloggedin = true;
  isplay = false;
  widgetblogs: any;
  hideBtn: boolean;
  isNocomment: boolean;
  isAuth$: boolean;
  socialUser: any;
  closeResult: string;
  collectid = [];
  index: any;
  hidetextfield = false;
  loader = false;
  commentid: any;
  userId: string;


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
      this.isAuth$ = data.isAuthenticated;
      this.userId = this.commonService.getFromStorage('userId') ? this.commonService.getFromStorage('userId') : '';
    });
    let url: any = this.activatedroute.url;
    this.previewtype = (url.value[0].path == 'blog-preview') ? 'preview' : 'detail';


    if (window.history.state && window.history.state.id) {
      this.getBlogview(window.history.state.id);
    } else if (this.activatedroute.snapshot.params.slug)
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
      this.loader = true;
      this.sportsService.getblogview(id).subscribe((res: any) => {
        this.loader = false;
        this.blogdata = res.data;
        this.initSEOTags();
        this.getPopularArticles();

        if (this.previewtype == 'detail')
          this.updatePostCount(this.blogdata._id);

        this.getBlogComments(this.blogdata._id, this.initBlogParams(this.blogdata._id));
      }, (error) => {
        this.loader = false;
      });
    }
  }

  // update post view count
  updatePostCount(id) {
    if (id) {
      this.sportsService.updatepostviewcount(id).subscribe(res => { });
    }
  }

  initSEOTags() {
    let title = this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info';
    this.meta.updateTag({ name: 'name', content: title });
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'subject', content: title });
    this.meta.updateTag({ name: 'keywords', content: title });

    let desc = (this.blogdata.sShortDesc) ? this.blogdata.sShortDesc : (this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info')
    this.meta.updateTag({
      name: 'description',
      content: desc
    });
    this.meta.updateTag({
      property: 'og:description',
      content: desc
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: desc
    });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    let image = this.commonService.isUrl(this.blogdata.sImage) ? this.blogdata.sImage : this.commonService.s3Url + this.blogdata.sImage;
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:src', content: image });
    this.meta.updateTag({ name: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:secure_url', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '640' });
    this.meta.updateTag({ property: 'og:image:height', content: '400' });

    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    // this.meta.updateTag({ property: 'twitter:card', content: data['twitter:card'] ? data['twitter:card'] : 'Sports.info' });
  }

  // video play event
  videoplay() {
    this.isplay = true;
    this.videoplayer.nativeElement.play();
  }

  clicksubmit() {
    if (this.usercommentvalue.trim()) {
      if (this.commonService.getFromStorage('userT')) {
        this.isloggedin = true;
        this.isNocomment = false;
        let data = {
          iPostId: this.blogdata._id,
          sComment: this.usercommentvalue
        };
        this.sportsService.addusercomment(data).subscribe((res: any) => {
          if (res) {
            this.usercommentvalue = '';
            this.getBlogComments(this.blogdata._id, { iPostId: this.blogdata._id, nStart: 0, nLimit: this.blogcomments.length > 4 ? this.blogcomments.length : 4 });
          }
        }, (error: any) => {
          if (error.status == 401) {
            this.store.dispatch(new Auth.SetUnauthenticated());
            this.authService.signOut();
            localStorage.removeItem('userT');
          }
        });
      } else {
        this.isloggedin = false;
        setTimeout(() => {
          this.isloggedin = true;
        }, 3000);
      }
    } else {
      if (this.commonService.getFromStorage('userT')) {
        this.isloggedin = true;
        this.isNocomment = true;
        setTimeout(() => {
          this.isNocomment = false;
        }, 3000);
      } else {
        this.isloggedin = false;
        setTimeout(() => {
          this.isloggedin = true;
        }, 3000);
      }
    }
  }


  // sharable link
  sharablelink(platform) {
    let url = `${this.commonService.siteUrl}${this.blogdata.eType.toLowerCase()}/${this.blogdata.sSlug}`;
    if (platform == 'facebook') {
      window.open(`http://www.facebook.com/sharer.php?u=${url}`, '_blank');
    } else if (platform == 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=&text=${url}`, '_blank');
    } else {
      window.open(`http://twitter.com/share?text=${this.blogdata.sTitle} !!! &url=${url}&hashtags=SportsDotinfo,Cricketblogs,sportslatest`, '_blank');
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
        this.blogcomments = this.blogcomments.concat(res.data);
        if (this.commentsParam.nLimit > res.data.length)
          this.isLoadMoreComments = false;
      } else {
        this.isLoadMoreComments = false;
      }
    });

    //  this.getBlogComments(this.blogdata._id,this.initBlogParams(this.blogdata._id))
  }

  getPopularArticles() {
    let data: any = {
      nstart: 0,
      nLimit: 10,
      aIds: this.blogdata.aIds
    };
    if (window.history.state && window.history.state.sport)
      data.eSport = window.history.state.sport.charAt(0).toUpperCase() + window.history.state.sport.slice(1);
    this.sportsService.getrelatedpost(data).subscribe((res: any) => {
      if (res['data']) {
        this.widgetblogs = res.data.filter((blog) => blog._id != this.blogdata._id);
      }
    });
  }

  // to get blog comments
  getBlogComments(id, data) {
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          this.blogcomments = res.data;
          if (this.commentsParam.nLimit > res.data.length)
            this.isLoadMoreComments = false;
        } else {
          this.isLoadMoreComments = false;
        }
      });
    }

  }

  // open login modal
  openmodal() {
    this.modalService.open(LoginModalComponent);
  }

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'delete') {
        this.deletecomment(id);
      }
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // save comment
  editcomment(id) {
    this.commentid = id;
    this.hidetextfield = !this.hidetextfield;
  }

  savecomment(id, data) {
    if (data != null && data.trim() != '') {
      this.sportsService.Editcomment(id, data).
        subscribe(
          (res: any) => {
            this.index = this.blogcomments.findIndex(data => data._id == res.data._id);
            this.blogcomments[this.index].sComment = res.data.sComment;
          });
      this.hidetextfield = false;
    }
  }

  cancelcomment() {
    this.hidetextfield = false;
  }

  deletecomment(id) {
    this.index = this.blogcomments.findIndex(data => data._id === id);
    this.sportsService.deleteusercomment(id).
      subscribe(res =>
        this.blogcomments.splice(this.index, 1),
        error => {
        });
  }

  // When the user scrolls the page, execute myFunction
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let blogHeight = document.getElementById('blogOuterSection');
    if (blogHeight) {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = blogHeight.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      document.getElementById('blogCompleteLine').style.width = scrolled + '%';
    }
  }

}



