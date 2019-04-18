import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cricket-menu',
  templateUrl: './cricket-menu.component.html',
  styleUrls: ['./cricket-menu.component.css']
})
export class CricketMenuComponent implements OnInit {

  @ViewChild('subnavpointer') subnavpointer: ElementRef
  @ViewChild('subnavbarmenu') subnavbarmenu: ElementRef
  menuitems = [
    { "name": 'Home', "id": "1" },
    { "name": 'Fixtures', "id": "2" },
    { "name": 'Series', "id": "3" },

  ]

  constructor(private renderer2: Renderer2, private router: Router) { }

  ngOnInit() {
  }

  //nav bar click event 
  linkactive(linkid) {
    var navel = this.subnavbarmenu.nativeElement
    var navrect = navel.getBoundingClientRect();
    var el = document.getElementById(`subnav-link${linkid}`); //get particular id nav-element
    var rect = el.getBoundingClientRect();
    var curPoint = rect['x'] - navrect['x'];
    this.renderer2.setStyle(this.subnavpointer.nativeElement, 'width', rect.width + "px"); //set
    this.renderer2.setStyle(this.subnavpointer.nativeElement, 'left', curPoint + "px");
    setTimeout(() => {
      if (linkid == '2') {
        this.router.navigate(['/cricket/fixtures'])
      }
      else if (linkid == '1') {
        this.router.navigate(['/cricket'])
      }
    },1000);
   
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

}
