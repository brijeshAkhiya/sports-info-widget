import { Component, OnInit } from "@angular/core";
import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.css"]
})
export class BlogListComponent implements OnInit {
  nstart:any = 0;
  nlimit:any= 10;
  blogs: any;
  data: any;
  widgetblogs: any;
  total: any;
  constructor(
    private sportsService: SportsService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getPopularArticles(this.nstart, this.nlimit);
    this.getRecentArticles();
  }
  //get popular posts

  getPopularArticles(start, limit) {
    let data = {
      eType:'Article',
      nstart: start,
      nLimit: limit
    };
    this.sportsService.getadminposts(data).subscribe(res => {
      if (res["data"]) {
        this.blogs = res["data"];
        this.total = res['data']
      }
    });
  }

  //load more button event
  loadmore() {  
    let start = this.blogs.length
    let data = {
      nstart: start,
      nLimit: 10,
      eType:'Article'
    };
    this.sportsService.getadminposts(data).subscribe(res => {
      if (res["data"]) {
        this.data = res["data"];
        this.total = res['data']
        this.blogs = this.blogs.concat(this.data);
       }
    });
  }

//
  getRecentArticles() {
    let data = {
      nstart: 0,
      nLimit: 10
    };
    this.sportsService.getadminposts(data).subscribe(res => {
      if (res["data"]) {
        this.widgetblogs = res["data"];
      }
    });
  }
}
