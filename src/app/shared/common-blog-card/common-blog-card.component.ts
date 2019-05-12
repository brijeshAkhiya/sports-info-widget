import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-blog-card',
  templateUrl: './common-blog-card.component.html',
  styleUrls: ['./common-blog-card.component.css']
})
export class CommonBlogCardComponent implements OnInit {

  @Input() posts: any;
  @Input() start: any;
  @Input() end: any;
  @Input() loadmore: any;
  constructor() { }

  ngOnInit() {
  }

}
