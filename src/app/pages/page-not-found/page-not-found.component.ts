import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  lottieConfig:any;

  constructor() {
    this.lottieConfig = {
      path: 'assets/json/404.json',
      autoplay: true,
      loop: true,
      renderer: 'canvas'
  };
   }

  ngOnInit() {
  }

}
