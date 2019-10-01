import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() posts: any;
  @Input() start: any;
  @Input() end: any;
  @Input() card_type: any;
  @Input() sport: any;

  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }

}
