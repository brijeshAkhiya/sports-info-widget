import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  template: `
  <app-menu [options]="{ sport: 'Racing', type: 'game', game: game }"></app-menu>
  <router-outlet></router-outlet>
  `
})
export class GameComponent implements OnInit {

  game;
  constructor(
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    let params: any = this.activatedroute.params;
    this.game = params.value.game;
  }

}
