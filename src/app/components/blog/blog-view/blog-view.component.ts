import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { SportsService } from "../../../providers/sports-service";
import { ActivatedRoute, Router } from "@angular/router";
import { SlugifyPipe } from '../../../pipes/slugpipe';
import { SplitPipe } from '../../../pipes/stringsplitpipe';
import { CommonService } from '@providers/common-service';

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit ,OnDestroy{
  blogid: any;
  blogtype: any;
  blogdata: any;
  blogUrl: any;
  blogshareid: any;
  blogslug: any;
  blogcomments: any;
  newcommnets: any;
  isplay:boolean = false
  widgetblogs: any;
  hideBtn: boolean = false;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private sportsService: SportsService,
    private slugifypipe:SlugifyPipe,
    private splitpipe:SplitPipe,
    private commonService:CommonService
  ) {}

  ngOnInit() {
    this.blogshareid = this.activatedroute.snapshot.params.id
    this.blogslug = this.activatedroute.snapshot.params.slug
    this.blogid = atob(this.activatedroute.snapshot.params.id);
    this.blogtype = this.activatedroute.snapshot.params.type;
    this.updatePostCount();
    this.getBlogview();
    this.getBlogComments();
    this.getPopularArticles();
  }

  getBlogview() {
    if (this.blogid) {
      this.sportsService.getblogview(this.blogid).subscribe(res => {
        this.blogdata = res["data"];
        if(this.blogdata.length == 4){
          this.hideBtn = true
        }
      },(error)=>{
          if(error['error'].status == 500){
            this.router.navigate(['/page-not-found'])
          }
      });
    }
  }

  //update post view count

  updatePostCount() {
    if (this.blogid) {
      this.sportsService.updatepostviewcount(this.blogid).subscribe(res => {});
    }
  }

  //to get blog comments
  getBlogComments(){
    if (this.blogid) {
      let data = {
        iPostId:this.blogid,
        nStart:0,
        nLimit:4
      }
      this.sportsService.getblogcommnets(data).subscribe(res => {
        if(res['data']){
          this.blogcomments = res['data'];
        }
      });
    }
  }

  //view more comments 

  viewmorecomments(){
    let start = this.blogcomments.length
    let data = {
      iPostId:this.blogid,
      nStart:start,
      nLimit:4
    }
    this.sportsService.getblogcommnets(data).subscribe(res => {
      if(res['data']){
        this.newcommnets = res['data'];
        if(this.newcommnets.length == 0){
            this.hideBtn = true
        }
        this.blogcomments = this.blogcomments.concat(this.newcommnets)
      }
    });

  }

  //video play event 
  videoplay(){
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
  getwidgetblogsview(id,type,title){
    this.blogid = id
    let slug = this.slugifypipe.transform(title);
    this.router.navigate(["/blog",type.toLowerCase(), btoa(id),slug]);
    this.updatePostCount();
    this.getBlogview();
    this.getBlogComments();
    this.getPopularArticles();
  }


  //tags view 
  tagview(id,type,title){
    let slugname = this.slugifypipe.transform(title);
    if(type == 'Player'){
    let playername = this.splitpipe.transform(title);
    let playerslug = this.slugifypipe.transform(playername)
    this.router.navigate(['/cricket/player',btoa(id),playerslug])
    } 
    else if(type == 'Tournament'){
      this.router.navigate(['/cricket/tournament',btoa(id),slugname]);
    }
    else if(type == 'Team'){
      this.router.navigate(['/cricket/team','c3I6dG91cm5hbWVudDoyNDcy',btoa(id),slugname])
    }
    else if(type == 'Match'){
      this.router.navigate(['/cricket/match/',btoa(id),slugname])
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
  writerview(id){
    this.router.navigate(['/writer',btoa(id)])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.videoplayer.nativeElement.stop();
  }

}
