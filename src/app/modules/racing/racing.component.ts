import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-racing',
  template: `
  <app-menu [options]="{ sport: 'Racing', type: 'home' }"></app-menu>
  <router-outlet></router-outlet>
  `
})
export class RacingComponent implements OnInit {

  constructor(
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    let params: any = this.activatedroute.params;
    console.log(this.activatedroute)
    // this.game = params.value.game;
  }

}
