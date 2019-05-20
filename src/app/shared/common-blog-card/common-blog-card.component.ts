import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  smallblogdeafault = '../../../assets/images/placeholder_blog_small.svg'
  constructor(private router: Router) { }

  ngOnInit() {
  }

   //writer view 
   writerview(id){
    this.router.navigate(['/writer',btoa(id)])
  }

}
