import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {
  lottieConfig:any;
  sport: any;
  constructor(private activatedroute: ActivatedRoute) {

    this.lottieConfig = {
      path: '../../../assets/json/animation.json',
      autoplay: true,
      loop: true
  };
   }

  ngOnInit() {
    this.sport = this.activatedroute.snapshot.params.sport;  
    this.activatedroute.params.subscribe(params => {
      // if (params.categoryId != Id) {

      this.sport = params.sport;
     // this.getMatchTimeline();
      // }
    });
  }

}
