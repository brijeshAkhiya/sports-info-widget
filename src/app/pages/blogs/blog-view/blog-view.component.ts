import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { SlugifyPipe } from '@app/shared/pipes/slugpipe';
import { SplitPipe } from '@app/shared/pipes/stringsplitpipe';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit {

  blogdata: any;
  previewtype: any;
  blogcomments = [];
  usercommentvalue = ''
  isloggedin: boolean = true;
  isplay: boolean = false
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  widgetblogs: any;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private slugifypipe: SlugifyPipe,
    private splitpipe: SplitPipe,
    public commonService: CommonService
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    console.log('in blogview');
    console.log('state::blogvieww',window.history.state);
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
    // for load social media widgets
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    const ngP = 'https';
    ngJs = document.createElement('script');
    ngJs.id = 'twitter-wjs';
    ngJs.src = ngP + '://platform.twitter.com/widgets.js';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);

    ngJs = document.createElement('script');
    ngJs.src = ngP + '://platform.instagram.com/en_US/embeds.js';
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
    if (this.usercommentvalue) {
      if (localStorage.getItem('userT')) {
        this.isloggedin = true
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
    return {
      iPostId: id,
      nStart: this.blogcomments.length,
      nLimit: 4
    }
  }

  viewmorecomments() {
    this.getBlogComments(this.blogdata._id, this.initBlogParams(this.blogdata._id))
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
  getBlogComments(id, data) {
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data) {
          if (res.data.length == 0)
            // this.hideBtn = true;
            this.blogcomments = this.blogcomments.concat(res.data)
        }
      });
    }
  }
  //writer view 
  writerview(id) {
    this.router.navigate(['/writer', btoa(id)])
  }

   //tags view 
   tagview(id, type, title) {
    let slugname = this.slugifypipe.transform(title);
    if (type == 'Player') {
      let playername = this.splitpipe.transform(title);
      let playerslug = this.slugifypipe.transform(playername)
      this.router.navigate(['/cricket/player', btoa(id), playerslug])
    }
    else if (type == 'Tournament') {
      this.router.navigate(['/cricket/tournament', btoa(id), slugname]);
    }
    else if (type == 'Team') {
      this.router.navigate(['/cricket/team', btoa(id), slugname])
    }
    else if (type == 'Match') {
      this.router.navigate(['/cricket/match/', btoa(id), slugname])
    }
  }

}
