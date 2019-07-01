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
  series;

  constructor(
    private sportsService: SportsService,
    private cricketService: CricketService
  ) { }

  ngOnInit() {
    if (typeof this.options != 'undefined') {
      if (this.options.type == 'cricket') {
        this.getCricketSeries();
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 156) {
       let element = document.getElementById('sub-navabar');
       element.classList.add('fixed-nav');
     } else {
      let element = document.getElementById('sub-navabar');
        element.classList.remove('fixed-nav'); 
     }
  }

  //get current cricket series 
  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res: any) => {
      if (res.data) {
        this.series = res.data
      }
    })
  }

}