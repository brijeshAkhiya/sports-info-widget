import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SportsService } from '../../providers/sports-service';
import { SlugifyPipe } from '../../pipes/slugpipe';

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
  cricketseries: any;

  constructor(private renderer2: Renderer2, private router: Router,private sportsService:SportsService,private slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.getCricketSeries();
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


    //get current cricket series 

    getCricketSeries() {
      this.sportsService.getcurrentseries().subscribe((res) => {
        if (res['data']) {
          this.cricketseries = res['data']           
        }
      })
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

  //get tournament info

  getournamentInfo(id,name){
    let slugname  =  this.slugifyPipe.transform(name); 
    this.router.navigate(['/cricket/tournament',btoa(id),slugname]);
  }

}
