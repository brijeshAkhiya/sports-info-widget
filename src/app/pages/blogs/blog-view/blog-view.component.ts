// import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, Inject, PLATFORM_ID, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'angularx-social-login';
import { takeUntil } from 'rxjs/operators';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { Subject } from 'rxjs';
import * as fromRoot from '../../../app-reducer';
import * as Auth from '@store/auth/auth.actions';

import { LoginModalComponent } from '../../../shared/widget/login-modal/login-modal.component';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { ObsEvent } from 'ng-lazyload-image/src/types';
import { userInfo } from 'os';
import { SchemaService } from '@app/shared/schema/schema.service';
import { Location, DOCUMENT, LocationStrategy, isPlatformBrowser, isPlatformServer } from '@angular/common';


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
  destroy$: Subject<boolean> = new Subject<boolean>();
  metatagsObj = {};
  requestedUrl;
  relatedArticles: any;
  start = 1;
  end = 5;
  notEmptyPost = true;
  notScrolly = true;
  loading = false;
  view = true;
  constructor(
    private router: Router,
    private meta: Meta,
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    private modalService: NgbModal,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private schemaService: SchemaService,
    @Inject(Location) private readonly location: Location,
    @Inject(DOCUMENT) private _document: Document,
    private readonly locationStrategy: LocationStrategy,
    @Inject(PLATFORM_ID) private platformId: Object,
    private pagetitle: Title,
    private injector: Injector
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
    this.getRelatedArticles();

  }

  onScroll(type?: string) {
      if (this.notEmptyPost && this.notScrolly) {
        if (!this.view) {
          this.loading = true;
          this.end += 4;
          this.loading = false;
        }
        if (type) {
          this.view = false;
          this.end += 4;
          this.loading = false;
        }
    } else {
      this.end = null;
    }
  }
  getRelatedArticles() {
    let data: any = {
      nstart: 0
    };
    if (window.history.state && window.history.state.sport)
      data.eSport = window.history.state.sport.charAt(0).toUpperCase() + window.history.state.sport.slice(1);
    this.sportsService.getrelatedpost(data).subscribe((res: any) => {
      if (res['data']) {
        this.relatedArticles = res.data.filter((blog) => blog._id != this.blogdata._id);
        console.log("Related",res.data)
      }
    });
  }

  ngAfterViewInit() {
    /** for load social media widgets */
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    const ngP = 'https';
    // Twitter
    setTimeout(() => {
      let ngTwitterJs = document.createElement('script');
      let sourceEle = document.getElementsByTagName('script')[0]
      ngTwitterJs.id = 'twitter-wjs';
      ngTwitterJs.src = 'https://platform.twitter.com/widgets.js';
      sourceEle.parentNode.insertBefore(ngTwitterJs, sourceEle);
    }, 1000);


    // Instagram
    ngJs = document.createElement('script');
    ngJs.src = ngP + '://platform.instagram.com/en_US/embeds.js';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);

    // Facebook
    ngJs = document.createElement('script');
    ngJs.src = ngP + '://connect.facebook.net/nl_NL/sdk.js#xfbml=1&amp;version=v3.3';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);
  }

  getSEOData() {
    this.store.select('Metatags').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {

      let metadata = data.MetaTags;
      let metaarray = [];
      metadata.map((data) => {
        // tslint:disable-next-line: max-line-length
        let routerUrl = data.sUrl.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,2}(:[0-9]{1,5})?(\/.*)?$');
        if (routerUrl != null && routerUrl[4] !== undefined)
          metaarray[routerUrl[4]] = data;
        else
          metaarray['/'] = data;
      });
      this.metatagsObj = { ...metaarray };
      this.requestedUrl = this.router.url;
      if (Object.keys(this.metatagsObj).length != 0 && this.requestedUrl)
        this.setmetatags(this.requestedUrl);
    });
  }

  getBlogview(id) {
    if (id) {
      this.loader = true;
      this.sportsService.getblogview(id).subscribe((res: any) => {
        this.loader = false;
        this.blogdata = res.data;
        this.getPopularArticles();
        this.getSEOData();
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
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:secure_url', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '640' });
    this.meta.updateTag({ property: 'og:image:height', content: '400' });

    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    // this.meta.updateTag({ property: 'twitter:card', content: data['twitter:card'] ? data['twitter:card'] : 'Sports.info' });
  }

  setmetatags(routerURL) {
    this.getBestMatchedUrl(routerURL).then(
      (data: any) => {
        if (data) {
          if (data.title) {
            this.meta.updateTag({ name: 'title', content: data.title });
            this.meta.updateTag({ property: 'og:title', content: data.title });
            this.meta.updateTag({ name: 'twitter:title', content: data.title });
          }
          this.meta.updateTag(
            {
              name: 'keywords', content: data.keywords ?
                data.keywords :
                'Cricket, Kabaddi, Soccer, Bad Minton, BasketBall, Field Hockey, Racing, Tennis Sports'
            });

          if (data.description) {
            this.meta.updateTag({ name: 'description', content: data.description });
            this.meta.updateTag({ property: 'og:description', content: data.description });
            this.meta.updateTag({ name: 'twitter:description', content: data.description });
          }

          let image = this.commonService.isUrl(this.blogdata.sImage) ? this.blogdata.sImage : this.commonService.s3Url + this.blogdata.sImage;

          //Code update here for image
          this.meta.updateTag({ name: 'twitter:image', content: image });
          this.meta.updateTag({ name: 'twitter:image:src', content: image });
          this.meta.updateTag({ property: 'og:image', content: image });

          if (data.topic)
            this.meta.updateTag({ name: 'topic', content: data.topic });
          if (data.subject)
            this.meta.updateTag({ name: 'subject', content: data.subject });
          if (data['og:type'])
            this.meta.updateTag({ property: 'og:type', content: data['og:type'] });
          if (data['twitter:card'])
            this.meta.updateTag({ name: 'twitter:card', content: data['twitter:card'] });

          if (data.title && data.description) {
            this.setSchema(data);
          } else {
            this.setSchema(null);
          }

        } else if (isPlatformBrowser(this.platformId)) {
          this.initSEOTags();
          this.setSchema(null);
        }
      }
    ).catch(e => {
      this.initSEOTags();
      this.setSchema(null);
    });
  }

  getBestMatchedUrl(url) {
    return new Promise((resolve, reject) => {
      try {
        if (Object.keys(this.metatagsObj).length == 0) reject();
        if (this.metatagsObj[url]) {
          resolve(this.metatagsObj[url]);
        } else {
          reject();
        }
      }
      catch (e) {
        console.log(e); reject(e);
      }
    });
  }

  setSchema(data) {
    const pathAfterDomainName = this.location.path();
    let blogTitle = this.commonService.siteUrl.replace(/\/$/, "") + pathAfterDomainName;
    let authorData: any = this.blogdata.iId;
    authorData.urlName = authorData.sFirstName + "-" + authorData.sLastName;
    authorData.displayName = authorData.sFirstName + " " + authorData.sLastName;
    let logoUrl = "https://dev.sports.info/assets/images/sports-info.jpg";

    // let schema = {
    //   "@context": "https://schema.org",
    //   "@graph": [
    //     {
    //       "@type": "WebSite",
    //       "@id": "https://www.sports.info/#website",
    //       "url": "https://www.sports.info/",
    //       "name": "Sports.info",
    //       "description": "Cricket|Soccer|Football|NBA|Sports News Live Scores|Players & Team Rankings",
    //       "potentialAction": [
    //         {
    //           "@type": "SearchAction",
    //           "target": "https://www.sports.info/?s={search_term_string}",
    //           "query-input": "required name=search_term_string"
    //         }
    //       ],
    //       "inLanguage": "en-US"
    //     },
    //     {
    //       "@type": "ImageObject",
    //       "@id": blogTitle + "#primaryimage",
    //       "inLanguage": "en-US",
    //       "url": this.blogdata.sImage,
    //       "width": 640,
    //       "height": 400
    //     },
    //     {
    //       "@type": "WebPage",
    //       "@id": blogTitle + "#webpage",
    //       "url": blogTitle + "",
    //       "name": this.blogdata.sTitle,
    //       "isPartOf": {
    //         "@id": "https://www.sports.info/#website"
    //       },
    //       "primaryImageOfPage": {
    //         "@id": blogTitle + "#primaryimage"
    //       },
    //       "datePublished": this.blogdata.dCreatedAt,
    //       "dateModified": this.blogdata.dUpdatedAt,
    //       "author": {
    //         "@id": "https://www.sports.info/writer/" + authorData._id + "/" + authorData.urlName
    //       },
    //       "description": this.blogdata.sTitle,
    //       "inLanguage": "en-US",
    //       "potentialAction": [
    //         {
    //           "@type": "ReadAction",
    //           "target": [
    //             blogTitle + ""
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "@type": "NewsArticle",
    //       "@id": blogTitle + "#article",
    //       "mainEntityOfPage": {
    //         "@id": blogTitle + "#webpage"
    //       },
    //       "headline": this.blogdata.sTitle,
    //       "image": {
    //         "@type": "ImageObject",
    //         "url": this.blogdata.sImage,
    //         "width": "800",
    //         "height": "600"
    //       },
    //       "datePublished": this.blogdata.dCreatedAt,
    //       "dateModified": this.blogdata.dUpdatedAt,
    //       "author": {
    //         "@type": "Person",
    //         "name": authorData.displayName,
    //         "@id": "https://www.sports.info/writer/" + authorData._id + "/" + authorData.urlName
    //       },
    //       "publisher": {
    //         "@type": "Organization",
    //         "name": "Sports Info",
    //         "logo": {
    //           "@type": "ImageObject",
    //           "url": logoUrl,
    //           "width": "115",
    //           "height": "60"
    //         }
    //       },
    //       "description": this.blogdata.sDescription
    //     }
    //   ]
    // };
    let schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.sports.info/",
          "url": "https://www.sports.info/",
          "name": "Sports.info",
          "description": "Cricket|Soccer|Football|NBA|Sports News Live Scores|Players & Team Rankings",
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": "https://www.sports.info/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US"
        },
        {
          "@type": "ImageObject",
          "@id": blogTitle,
          "inLanguage": "en-US",
          "url": this.blogdata.sImage,
          "width": 640,
          "height": 400
        },
        {
          "@type": "WebPage",
          "@id": blogTitle,
          "url": blogTitle + "",
          "name": data != null ? data.title : this.blogdata.sTitle,
          "isPartOf": {
            "@id": "https://www.sports.info/"
          },
          "primaryImageOfPage": {
            "@id": blogTitle
          },
          "datePublished": this.blogdata.dCreatedAt,
          "dateModified": this.blogdata.dUpdatedAt,
          "author": {
            "@id": "https://www.sports.info/writer/" + authorData._id + "/" + authorData.urlName
          },
          "description": data != null ? data.description : this.blogdata.sTitle,
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [
                blogTitle + ""
              ]
            }
          ]
        },
        {
          "@type": "NewsArticle",
          "@id": blogTitle,
          "mainEntityOfPage": {
            "@id": blogTitle
          },
          "headline": this.blogdata.sTitle,
          "image": {
            "@type": "ImageObject",
            "url": this.blogdata.sImage,
            "width": "800",
            "height": "600"
          },
          "datePublished": this.blogdata.dCreatedAt,
          "dateModified": this.blogdata.dUpdatedAt,
          "author": {
            "@type": "Person",
            "name": authorData.displayName,
            "@id": "https://www.sports.info/writer/" + authorData._id + "/" + authorData.urlName
          },
          "publisher": {
            "@type": "Organization",
            "name": "Sports Info",
            "logo": {
              "@type": "ImageObject",
              "url": logoUrl,
              "width": "115",
              "height": "60"
            }
          },
          "description": this.blogdata.sDescription
        }
      ]
    };
    this.schemaService.prepareSchema(schema);
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
        console.log(res.data)
      }
    });
  }

  // to get blog comments
  getBlogComments(id, data) {
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          console.log(res.data);

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



