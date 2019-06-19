import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, AfterViewInit } from "@angular/core";
import { SportsService } from "../../../providers/sports-service";
import { ActivatedRoute, Router } from "@angular/router";
import { SlugifyPipe } from '@pipes/slugpipe';
import { SplitPipe } from '@pipes/stringsplitpipe';
import { CommonService } from '@providers/common-service';

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit, OnDestroy, AfterViewInit {
  blogtype: any;
  blogdata: any;
  blogUrl: any;
  blogshareid: any;
  blogslug: any;
  blogcomments = [];
  isplay: boolean = false
  widgetblogs: any;
  hideBtn: boolean = false;
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  url: any;
  previewtype: any;


  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
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
    console.log(this.activatedroute);
    this.url = this.activatedroute.url;

    if (this.activatedroute.snapshot.params.id)
      this.getBlogview(atob(this.activatedroute.snapshot.params.id));
    this.previewtype = (this.url.value[0].path == "blog-preview") ? 'preview' : 'detail';
    this.blogshareid = this.activatedroute.snapshot.params.id
    this.blogslug = this.activatedroute.snapshot.params.slug
    this.blogtype = this.activatedroute.snapshot.params.type;
    this.getPopularArticles();
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
        let type = (this.previewtype == "detail") ? this.url.value[0].path : this.url.value[1].path;
        if (type.toUpperCase() != this.blogdata.eType.toUpperCase())
          this.router.navigate(['/page-not-found'])

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

  //to get blog comments
  getBlogComments(id, data) {
    if (id) {
      this.sportsService.getblogcommnets(data).subscribe((res: any) => {
        if (res.data) {
          if (res.data.length == 0)
            this.hideBtn = true;
          this.blogcomments = this.blogcomments.concat(res.data)
        }
      });
    }
  }

  //video play event 
  videoplay() {
    this.isplay = true
    this.videoplayer.nativeElement.play();
  }

  //get related stories 

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

  // get widget blogs view 
  getwidgetblogsview(id, type, title) {
    let slug = this.slugifypipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id), slug]);
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

  //sharable link 
  sharablelink(platform) {
    this.blogUrl = `${this.commonService.siteUrl}blog/${this.blogtype}/${this.blogshareid}/${this.blogslug}`;
    if (platform == 'facebook') {
      window.open(`http://www.facebook.com/sharer.php?u=${this.blogUrl}`, '_blank');
    }
    else if (platform == 'whatsapp') {
      window.open(`https://web.whatsapp.com/send?text=${this.blogUrl}`, '_blank');
    }
    else {
      window.open(`http://twitter.com/share?text=This is our new blog !!! &url=${this.blogUrl}&hashtags=Sports.info,Cricketblogs,sportslatest`, '_blank')
    }
  }

  //writer view 
  writerview(id) {
    this.router.navigate(['/writer', btoa(id)])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.videoplayer.nativeElement.stop();
  }

}
