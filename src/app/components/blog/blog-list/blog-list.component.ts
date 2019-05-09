import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../providers/sports-service";
import { SlugifyPipe } from "../../../pipes/slugpipe";

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
  constructor(private sportsService: SportsService, private slugifyPipe: SlugifyPipe, private router: Router) {}

  ngOnInit() {
    this.getPopularArticles(this.nstart, this.nlimit);
  }
  //get popular posts

  getPopularArticles(start, limit) {
    let data = {
      nstart: start,
      nLimit: limit
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.blogs = res["data"];
      }
    });
  }

  //load more button event
  loadmore() {  
    let start = this.blogs.length
    let data = {
      nstart: start,
      nLimit: 10
    };
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.data = res["data"];
        this.blogs = this.blogs.concat(this.data);
       }
    });
  }

   //blog view

   blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type, btoa(id),slugname]);
  }
}
