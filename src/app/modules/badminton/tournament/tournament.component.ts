import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament',
  template: `
    <app-menu [options]="{sport:'Badminton', type : 'tournament'}" [name]="tournamentname"></app-menu>
    <router-outlet></router-outlet>
  `
})
export class TournamentComponent implements OnInit {

  tournamentname: any;
  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    let name = this.activatedroute.snapshot.params.slug;
    this.tournamentname = name.replace(/-/g, ' ');
  }

}
