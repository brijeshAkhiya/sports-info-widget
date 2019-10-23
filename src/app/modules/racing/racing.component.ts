import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-racing',
  template: `
  <app-menu [options]="{ sport: 'Racing', type: 'home' }"></app-menu>
  <router-outlet></router-outlet>
  `
})
export class RacingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
