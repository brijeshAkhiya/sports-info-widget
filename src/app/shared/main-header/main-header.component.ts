import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxTinySliderSettingsInterface } from 'ngx-tiny-slider';
import { SportsService } from '../../providers/sports-service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @ViewChild('navpointer') navpointer: ElementRef
  @ViewChild('navbarnav') navbarnav: ElementRef
  tinySliderConfig: NgxTinySliderSettingsInterface;

  Sportsnames = [
    { "name": "Cricket", "id": "1", "route": "/cricket" },
    { "name": "Soccer", "id": "2" },
    { "name": "Badminton", "id": "3" },
    { "name": "Basketball", "id": "4" },
    { "name": "Field Hockey", "id": "5" },
    { "name": "Racing", "id": "6" },
    { "name": "Tennis sports", "id": "7" },
  ]

  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" }
  ];
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  sliderdata: any;
  sliderresults = [];


  constructor(private renderer2: Renderer2, private el: ElementRef, private router: Router, private sportsService: SportsService) {
    // this.tinySliderConfig = {
    //   arrowKeys: true,
    //   nav: false,
    //   items: 1,
    //   mouseDrag: true,
    //   autoHeight: true,
    //   responsive: {
    //     1400: {
    //       items: 4
    //     },
    //     1200: {
    //       items: 3
    //     },
    //     768: {
    //       items: 2
    //     }
    //   }
    // };
  }


  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      540: {
        items: 2,
      },
      783: {
        items: 3,
      },
      1150: {
        items: 4,
      }
    },
    nav: true
  }


  ngOnInit() {
    this.getHeaderSliderData();
  }

  //nav bar click event 
  linkactive(linkid) {
    var navel = this.navbarnav.nativeElement
    var navrect = navel.getBoundingClientRect();
    var el = document.getElementById(`nav-link${linkid}`); //get particular id nav-element
    var rect = el.getBoundingClientRect();
    var curPoint = rect['x'] - navrect['x'];
    this.renderer2.setStyle(this.navpointer.nativeElement, 'width', rect.width + "px"); //set
    this.renderer2.setStyle(this.navpointer.nativeElement, 'left', curPoint + "px");
  }

  //dynamic routing
  routing(routerlink) {
    if (routerlink) {
      this.router.navigate([`${routerlink}`]);
    }
    else {
      this.router.navigate(['/'])
    }
  }

  //get header slider data

  getHeaderSliderData() {
    this.sportsService.getheaderslider().subscribe((res) => {
      if (res['data']) {
        this.sliderdata = res['data'];
        this.sliderdata.map((data) => {
          if (data.slider_status == 'results') {
            this.sliderresults.push(data);
          }
        })
        this.sliderresults = this.sliderresults.map(data => {
          let obj = {};
          let team_arr = data["competitors"]
          team_arr.map(single => {
            obj[single.qualifier] = single
          })

          let period_score_new = data["period_scores"]
          if (period_score_new) {
            period_score_new = period_score_new.map(singleb => {
              if (singleb.away_score !== undefined) {
                return { ...singleb, team: obj["away"], teamFlag: true }
              } else {
                return { ...singleb, team: obj["home"], teamFlag: false }
              }
            })
            return { ...data, period_score_new }
          }
          else {
            return data;
          }
        })
      }

    })
  }

}
