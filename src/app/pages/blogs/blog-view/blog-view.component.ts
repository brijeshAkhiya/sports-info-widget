// import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  isLoadMoreComments: boolean = true;
  blogdata: any;
  previewtype: any;
  blogcomments = [];
  commentsParam: any = { nStart: 0, nLimit: 4 }
  usercommentvalue = ''
  isloggedin: boolean = true;
  isplay: boolean = false
  widgetblogs: any;
  hideBtn: boolean;
  isNocomment: boolean;
  isAuth$: boolean;
  socialUser: any;
  closeResult: string;
  collectid = [];
  index:any; 
  hidetextfield:boolean=false;
  loader: boolean = false; 
  interval: any;
  newcomment: any;
  change;

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
      this.loader = true;
      this.sportsService.getblogview(id).subscribe((res: any) => {
        this.loader = false;
        this.blogdata = res.data;
        console.log(res.data)
        this.initSEOTags();
        this.getPopularArticles();

        if (this.previewtype == 'detail')
          this.updatePostCount(this.blogdata._id)

        this.getBlogComments(this.blogdata._id, this.initBlogParams(this.blogdata._id));
      }, (error) => {
        this.loader = false;
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
    console.log("initSEOTags", this.blogdata)
    this.meta.updateTag({ name: 'name', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ property: 'og:title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'twitter:title', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'subject', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });
    this.meta.updateTag({ name: 'keywords', content: this.blogdata.sTitle ? this.blogdata.sTitle : 'Sports.info' });

    this.meta.updateTag({ name: 'description', content: (this.blogdata.sShortDesc) ?  this.blogdata.sShortDesc : (this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info') });
    this.meta.updateTag({ property: 'og:description', content: (this.blogdata.sShortDesc) ?  this.blogdata.sShortDesc : (this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info') });
    this.meta.updateTag({ name: 'twitter:description', content: (this.blogdata.sShortDesc) ?  this.blogdata.sShortDesc : (this.blogdata.sDescription ? this.blogdata.sDescription.substring(0, 250) : 'Sports.info') });
    
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'twitter:image', content: this.commonService.s3Url + this.blogdata.sImage ? this.blogdata.sImage : '' });
    this.meta.updateTag({ name: 'twitter:image:src', content: this.commonService.s3Url + this.blogdata.sImage ? this.blogdata.sImage : '' });
    this.meta.updateTag({ property: 'og:image', content: this.commonService.s3Url + this.blogdata.sImage ? this.blogdata.sImage : '' });
    this.meta.updateTag({ property: 'og:image:secure_url', content: this.commonService.s3Url + this.blogdata.sImage ? this.blogdata.sImage : '' });
    this.meta.updateTag({ property: 'og:image:width', content: '640' });
    this.meta.updateTag({ property: 'og:image:height', content: '400' });

    this.meta.updateTag({ property: 'og:url', content: window.location.href });    
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
    // console.log(data)
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
    console.log(this.blogcomments)
    return this.commentsParam;
  }

  viewmorecomments() {

    this.sportsService.getblogcommnets(this.initBlogParams(this.blogdata._id)).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        this.blogcomments = this.blogcomments.concat(res.data)
        console.log(this.blogcomments)
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
  getBlogComments(id, data) {
    console.log(id)
    console.log(data)
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          this.blogcomments = res.data
          console.log(this.blogcomments)
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

  open(content,id) {
    console.log(id)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    if(result == "delete")
    {
      this.deletecomment(id);
    }
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //save comment
  commentid;status;
  editcomment(id)
  {
    this.commentid = id; 
    this.hidetextfield = !this.hidetextfield;
  }

  savecomment(id,data)
  {
    console.log(data,id)
    this.sportsService.Editcomment(id,data).
        subscribe(
          res=>
          {   
            this.change = res;
            this.status = this.change.status;
            this.newcomment = this.change.data.sComment;
          },
        err=>console.log(err));
    this.hidetextfield = false;
  }

  cancelcomment()
  {
    this.hidetextfield = false;
    console.log('cancel')
  }

  deletecomment(id)
  {
    console.log(id)
    this.index = this.blogcomments.findIndex(data => data._id === id);
    this.sportsService.deleteusercomment(id).
        subscribe(res=>
        this.blogcomments.splice(this.index,1),
               error=>{
                  console.log(error)
                });
  }

  // When the user scrolls the page, execute myFunction 
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
      var blogHeight = document.getElementById("blogOuterSection");
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = blogHeight.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("blogCompleteLine").style.width = scrolled + "%";
  }

}



