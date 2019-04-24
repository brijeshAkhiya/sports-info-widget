import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '../../providers/sports-service';


@Component({
  selector: 'app-common-news-list',
  templateUrl: './common-news-list.component.html',
  styleUrls: ['./common-news-list.component.css']
})
export class CommonNewsListComponent implements OnInit {
  recentposts: any;
  @Input() type: any;
  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getRecentPosts(this.type);
  }


  //get recent posts 

  getRecentPosts(type) {
    let data = {
      eType: type,
      nLimit: 10
    }
    this.sportsService.getrecentpost(data).subscribe((res) => {
      if (res['data']) {
        this.recentposts = res['data'];
      }
    })
  }
}
