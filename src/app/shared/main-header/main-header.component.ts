import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  @ViewChild('navpointer') navpointer: ElementRef
  @ViewChild('navbarnav') navbarnav: ElementRef

  Sportsnames = [
    { "name": "Cricket", "id": "1", "route": "/cricket" },
    { "name": "Soccer", "id": "2" },
    { "name": "Badminton", "id": "3" },
    { "name": "Basketball", "id": "4" },
    { "name": "Field Hockey", "id": "5" },
    { "name": "Racing", "id": "6" },
    { "name": "Tennis sports", "id": "7" },
  ]

  constructor(private renderer2: Renderer2, private el: ElementRef, private router: Router) { }

  ngOnInit() {
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

}
