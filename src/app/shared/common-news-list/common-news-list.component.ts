import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from '../../providers/sports-service';
import { SlugifyPipe } from "../../pipes/slugpipe";

@Component({
  selector: 'app-common-news-list',
  templateUrl: './common-news-list.component.html',
  styleUrls: ['./common-news-list.component.css']
})
export class CommonNewsListComponent implements OnInit {
  posts: any;
  @Input() type: any;
  @Input() reqparams: {};
  loadnewposts: any;
  constructor(private sportsService: SportsService,private slugifyPipe: SlugifyPipe, private router: Router) { }

  ngOnInit() {
     if (this.reqparams) { 
      this.posts = []
      this.getRelatedPosts(this.reqparams)
    }
    else if(this.type == 'any'){
      this.posts = []
      this.getRecentPosts(this.type);
    }

  }


  //get recent posts 

  getRecentPosts(type) {
    let data = {
      eType: type,
      nLimit: 10
    }
    this.sportsService.getrecentpost(data).subscribe((res) => {
      if (res['data']) {
        this.posts = res['data'];
      }
    })
  }

  //get related posts / specific id 

  getRelatedPosts(data) {
    this.sportsService.getrelatedpost(data).subscribe((res) => {
      if (res['data']) {
        this.posts = res['data'];

      }
    })
  }

  //load more blogs

  loadmore(){
    let start = this.posts.length
    let data = {
      nStart:start,
      nLimit:4
    }
    this.sportsService.getrelatedpost(data).subscribe((res) => {
      if (res['data']) {
        this.loadnewposts = res['data'];
        this.posts = this.posts.concat(this.loadnewposts)
      }
    })
  }


  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type, btoa(id),slugname]);
  }
}
