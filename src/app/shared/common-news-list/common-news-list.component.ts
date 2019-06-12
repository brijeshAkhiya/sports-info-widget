import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../providers/sports-service";
import { SlugifyPipe } from "../../pipes/slugpipe";
@Component({
  selector: "app-common-news-list",
  templateUrl: "./common-news-list.component.html",
  styleUrls: ["./common-news-list.component.css"]
})
export class CommonNewsListComponent implements OnInit {
  posts: any;
  @Input() type: any;
  @Input() reqparams: {};
  loadnewposts: any;
  isdisplay: boolean;
  smallblogdeafault = "../../../assets/images/placeholder_blog_small.svg";
  writerid: any;
  iswritervideo: boolean;
  relatedids: any;
  isloading: any;
  constructor(
    private sportsService: SportsService,
    private slugifyPipe: SlugifyPipe,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.type == "any") {
      this.posts = [];
      this.getRecentPosts();
    } 
    else if (this.type == 'recents'){
      this.getRecentsPostsparams(this.reqparams)
    }
    else if (this.type == "writerrecent" || this.type == "writerpopular" || this.type == "writervideos") {
      this.writerid = this.reqparams["_id"];
      this.getWriterblogs(this.reqparams);
    } else {
      this.posts = [];
      this.relatedids = this.reqparams["aIds"];
      this.getRelatedPosts(this.reqparams);
    }
  }
  //get recent posts

  getRecentPosts() {
    let data = {
      nLimit: 10
    };
    this.isdisplay = false;
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res["data"]) {
        this.posts = res["data"];
        this.isdisplay = true;
      }
    });
  }

  //get recents posts params wise 
  getRecentsPostsparams(requestparams){
    let data = {
      nLimit: 10
    };
    this.isdisplay = false;
    this.sportsService.getrecentpost(requestparams).subscribe(res => {
      if (res["data"]) {
        this.posts = res["data"];
        this.isdisplay = true;
      }
    });
  }

  //get related posts / specific id

  getRelatedPosts(data) {
    this.isdisplay = false;
    this.sportsService.getrelatedpost(data).subscribe(res => {
      if (res["data"]) {
        this.posts = res["data"];
        this.isdisplay = true;
      }
    });
  }

  //get writer blogs
  getWriterblogs(data) {
    if (data) {
      this.isdisplay = false;
      this.sportsService.getwriterprofile(data).subscribe(res => {
        if (res["data"] && res["data"]["posts"]) {
          this.isdisplay = true;
          this.posts = res["data"]["posts"].posts;
        } else {
          this.isdisplay = true;
        }
      });
    }
  }

  //load more blogs

  loadmore() {
    if (this.type == 'writerpopular' || this.type == 'writervideos' || this.type == 'writerrecent') {
      let data = {
        _id: this.writerid,
        nStart: this.posts.length,
        nLimit: 10,
        eType: this.iswritervideo ? "Videos" : ""
      };
      this.isdisplay = false;
      this.sportsService.getwriterprofile(data).subscribe(res => {
        if (res["data"]["posts"] && res["data"]["posts"].posts) {
          this.loadnewposts = res["data"]["posts"].posts;
          this.posts = this.posts.concat(this.loadnewposts);
          this.isdisplay = true;
        } else {
          this.loadnewposts = [];
          this.isdisplay = true;
        }
      });
    }
    else if (this.type == 'homelatest') {
      let start = this.posts.length;
      let data = {
        eSort: 'Latest',
        nStart: start,
        nLimit: 4
      };
      this.isdisplay = false;
      this.sportsService.getrecentpost(data).subscribe(res => {
        if (res["data"]) {
          this.loadnewposts = res["data"];
          this.posts = this.posts.concat(this.loadnewposts);
          this.isdisplay = true;
        }
      });
    }
    else if (this.type == 'recents'){
      let start = this.posts.length;
      let data = {
        eSort: 'Latest',
        nStart: start,
        nLimit: 4
      };
      this.isdisplay = false;
      this.sportsService.getrecentpost(data).subscribe(res => {
        if (res["data"]) {
          this.loadnewposts = res["data"];
          this.posts = this.posts.concat(this.loadnewposts);
          this.isdisplay = true;
        }
      });
    }
    else if (this.type == undefined) {
      let start = this.posts.length;
      let data = {
        aIds: this.relatedids,
        nStart: start,
        nLimit: 4
      };
      this.isdisplay = false;
      this.sportsService.getrelatedpost(data).subscribe(res => {
        if (res["data"]) {
          this.loadnewposts = res["data"];
          this.posts = this.posts.concat(this.loadnewposts);
          this.isdisplay = true;
        }
      });
    }
    console.log("loadnewposts", this.loadnewposts);
  }

  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id), slugname]);
  }

  //writer view
  writerview(id) {
    this.router.navigate(["/writer", btoa(id)]);
  }
}
