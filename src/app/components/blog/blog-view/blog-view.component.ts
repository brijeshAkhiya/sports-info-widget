import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SportsService } from "../../../providers/sports-service";
import { ActivatedRoute, Router } from "@angular/router";
import { SlugifyPipe } from '../../../pipes/slugpipe';
import { SplitPipe } from '../../../pipes/stringsplitpipe';


@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogViewComponent implements OnInit {
  blogid: any;
  blogtype: any;
  blogdata: any;
  blogUrl: any;
  blogshareid: any;
  blogslug: any;
  blogcomments: any;
  newcommnets: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private sportsService: SportsService,
    private slugifypipe:SlugifyPipe,
    private splitpipe:SplitPipe
  ) {}

  ngOnInit() {
    this.blogshareid = this.activatedroute.snapshot.params.id
    this.blogslug = this.activatedroute.snapshot.params.slug
    this.blogid = atob(this.activatedroute.snapshot.params.id);
    this.blogtype = this.activatedroute.snapshot.params.type;
    this.updatePostCount();
    this.getBlogview();
    this.getBlogComments();
  }

  getBlogview() {
    if (this.blogid) {
      this.sportsService.getblogview(this.blogid).subscribe(res => {
        this.blogdata = res["data"];
      });
    }
  }

  updatePostCount() {
    if (this.blogid) {
      this.sportsService.updatepostviewcount(this.blogid).subscribe(res => {});
    }
  }

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
          console.log(this.blogcomments);
          
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
        this.blogcomments = this.blogcomments.concat(this.newcommnets)
      }
    });
  }

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
    this.blogUrl = `http://d1hitf94u9j1e1.cloudfront.net/blog/${this.blogtype}/${this.blogshareid}/${this.blogslug}`;
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

}