import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '../../providers/sports-service';


@Component({
  selector: 'app-common-news-list',
  templateUrl: './common-news-list.component.html',
  styleUrls: ['./common-news-list.component.css']
})
export class CommonNewsListComponent implements OnInit {
  posts: any;
  @Input() type: any;
  @Input() reqparams: {};
  constructor(private sportsService: SportsService) { }

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
        console.log('data', this.posts);

      }
    })
  }
}
