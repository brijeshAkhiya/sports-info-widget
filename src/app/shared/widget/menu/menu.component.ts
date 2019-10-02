import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';

import { SportsService } from '@providers/sports-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, OnDestroy {

  @ViewChild('subnavpointer') subnavpointer: ElementRef;
  @ViewChild('subnavbarmenu') subnavbarmenu: ElementRef;
  @Input() options;
  @Input() name;
  series;
  public windowinnerWidth: any;

  constructor(
    private sportsService: SportsService,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    document.getElementById('main-body').classList.add('submenu-open');
    if (typeof this.options !== 'undefined') {
      if (this.options.sport === 'Cricket') {
        this.getCricketSeries();
      }
    }
  }
  responsiveSticky(value) {
    const element = document.getElementById('sub-navabar');
    const bodyelement = document.getElementById('main-body');
    if (window.pageYOffset > value) {
      if (element != null) element.classList.add('fixed-nav');
      if (bodyelement != null) bodyelement.classList.add('sticky-submenu');
    } else {
      if (element != null) element.classList.remove('fixed-nav');
      if (bodyelement != null) bodyelement.classList.remove('sticky-submenu');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.windowinnerWidth = window.innerWidth;
    if (this.windowinnerWidth < 576) this.responsiveSticky(163);
    else this.responsiveSticky(129);
  }

  ngOnDestroy() {
    const bodyelement = document.getElementById('main-body');
    if (bodyelement != null) bodyelement.classList.remove('sticky-submenu');
    bodyelement.classList.remove('submenu-open');
  }
  /* get current cricket series  */
  getCricketSeries() {
    this.sportsService.getcurrentseries().subscribe((res: any) => {
      if (res.data)
        this.series = res.data;
    });
  }

}
