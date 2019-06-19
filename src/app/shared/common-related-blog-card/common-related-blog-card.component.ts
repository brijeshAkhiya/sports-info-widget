import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SlugifyPipe } from "@pipes/slugpipe";
import { CommonService } from "@providers/common-service";
import { start } from 'repl';

@Component({
  selector: 'app-common-related-blog-card',
  templateUrl: './common-related-blog-card.component.html',
  styleUrls: ['./common-related-blog-card.component.css']
})
export class CommonRelatedBlogCardComponent implements OnInit {

  @Input() posts: any;
  @Input() start: any;
  @Input() end: any;
  
  constructor(private slugifyPipe: SlugifyPipe, private router: Router, public commonService:CommonService) { }

  ngOnInit() {
  }

   //blog view

   blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id),slugname]);
  }

}
