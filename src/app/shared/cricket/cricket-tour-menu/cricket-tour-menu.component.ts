import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-cricket-tour-menu',
  templateUrl: './cricket-tour-menu.component.html',
  styleUrls: ['./cricket-tour-menu.component.css']
})
export class CricketTourMenuComponent implements OnInit {
  @Input() dataToChild: any;
  constructor() { }

  ngOnInit() {
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

}
