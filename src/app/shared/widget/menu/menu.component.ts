import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

import { SportsService } from '@providers/sports-service'
import { CricketService } from '@providers/cricket-service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('subnavpointer') subnavpointer: ElementRef
  @ViewChild('subnavbarmenu') subnavbarmenu: ElementRef
  @Input() options;
  @Input() name;
  series;

  constructor(
    private sportsService: SportsService,
    private cricketService: CricketService
  ) { }

  ngOnInit() {
    if (typeof this.options != 'undefined') {
      if (this.options.sport == 'cricket') {
        this.getCricketSeries();
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 176) {
      let element = document.getElementById('sub-navabar');
      element.classList.add('fixed-nav');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.add('sticky-submenu');
    } else {
      let element = document.getElementById('sub-navabar');
      element.classList.remove('fixed-nav');
      let bodyelement = document.getElementById('main-body');
      bodyelement.classList.remove('sticky-submenu');
    }
  }
  ngOnDestroy(){
    let bodyelement = document.getElementById('main-body');
    bodyelement.classList.remove('sticky-submenu');
  }
  //get current cricket series 
  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.series = res.data
      }
    })
  }

}
