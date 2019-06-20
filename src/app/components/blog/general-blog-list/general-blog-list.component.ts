import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";
import { SlugifyPipe } from "@pipes/slugpipe";

@Component({
  selector: 'app-general-blog-list',
  templateUrl: './general-blog-list.component.html',
  styleUrls: ['./general-blog-list.component.css']
})
export class GeneralBlogListComponent implements OnInit {
  nstart:any = 0;
  nlimit:any= 10;
  blogs: any;
  data: any;
  widgetblogs: any;
  total: any;
  blogcategory: string;
  blogtype: any;
  constructor(private sportsService: SportsService, private slugifyPipe: SlugifyPipe, private router: Router, private activatedroute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    this.blogcategory = this.activatedroute.snapshot.params.category;
    this.blogtype = this.activatedroute.snapshot.params.eType;
    if(this.blogcategory == 'popular'){
      this.getPopularArticles(this.nstart,this.nlimit);
    }
    else if(this.blogcategory == 'recent'){
      this.getRecentArticles(this.nstart,this.nlimit)
    }
    else{
      this.router.navigate(['/page-not-found'])
    }
    this.getRecentArticles(this.nstart,this.nlimit);

  }

   //get popular posts

   getPopularArticles(start, limit) {
    let data = {
      eType:this.blogtype.charAt(0).toUpperCase() + this.blogtype.slice(1),
      nStart: start,
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
      nStart: start,
      nLimit: 10,
      eType:this.blogtype.charAt(0).toUpperCase() + this.blogtype.slice(1)
    };
    if(this.blogcategory == 'popular'){
    this.sportsService.getpopularpost(data).subscribe(res => {
      if (res["data"]) {
        this.data = res["data"];
        this.blogs = this.blogs.concat(this.data);
       }
    });
  }
  else{
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res["data"]) {
        this.data = res["data"];
        this.blogs = this.blogs.concat(this.data);
       }
    });
  }
  }

//
  getRecentArticles(start,limit) {
    let data = {
      eType:this.blogtype.charAt(0).toUpperCase() + this.blogtype.slice(1),
      nStart: start,
      nLimit: limit
    };
    this.sportsService.getrecentpost(data).subscribe(res => {
      if (res["data"]) {
        this.widgetblogs = res["data"];
        this.blogs = res['data']
      }
    });
  }
   //blog view

   blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog",type.toLowerCase(), btoa(id),slugname]);
  }

}
