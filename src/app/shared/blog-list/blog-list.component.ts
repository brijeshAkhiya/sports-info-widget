import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  
  @Input() options; 
  @Input() data; 
  @Input() start;
  @Input() type; 

  isLoading: boolean = false;
  isLoadMore: boolean = true;
  articles = [];

  constructor(
    private sportsService: SportsService
    ) { 
  }

  ngOnInit() {  
    console.log(this.options)
    if(this.options){
      if(this.options.data && this.options.data.length > 0)
        this.articles = (this.options.start) ? this.options.data.slice(this.options.start) : this.options.data;
      else if(this.options.reqParams && this.options.reqParams.aIds)
        this.getRelatedPosts();
      else if(this.options.type == 'writer' && typeof this.options.reqParams._id != 'undefined')
        this.getWriterPosts()
      else
        this.getArticles();

    }
    
  }
  //get popular posts
  getPopularArticles() {
    this.isLoading = true;
    this.sportsService.getpopularpost(this.options.reqParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data.length > 0) 
        this.articles = this.articles.concat(res.data);
      else
        this.isLoadMore = false;
    });
  }
  //get articles
  getArticles() {
    this.isLoading = true;
    this.sportsService.getrecentpost(this.options.reqParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data.length > 0) 
        this.articles = this.articles.concat(res.data);
      else
        this.isLoadMore = false;
    });
  }

  //get related posts 
  getRelatedPosts() {
    this.isLoading = true;
    this.sportsService.getrelatedpost(this.options.reqParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data.length > 0) 
        this.articles = this.articles.concat(res.data);
      else
        this.isLoadMore = false;
    });
  }

  getWriterPosts(){
    this.isLoading = true;
    this.sportsService.getwriterprofile(this.options.reqParams).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data.posts && res.data.posts.posts.length > 0) 
        this.articles = this.articles.concat(res.data.posts.posts);
      else
        this.isLoadMore = false;
    });

  }


  loadmore(){
    this.options.reqParams.nStart =  (this.options.data && this.options.data.length > this.articles.length) ? this.options.data.length : this.articles.length;
    if(this.options.reqParams && this.options.reqParams.aIds)
      this.getRelatedPosts();
    else if(this.options.type == 'popular')
      this.getPopularArticles();
    else if(this.options.type == 'writer' && typeof this.options.reqParams._id != 'undefined')
      this.getWriterPosts()
    else
      this.getArticles();
  }

}
