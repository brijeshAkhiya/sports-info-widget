import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @Input() posts: any;
  @Input() start: any;
  @Input() end: any;
  @Input() card_type: any;
  
  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit() {
    console.log(this.posts);
    console.log(this.card_type);
    
  }

}
