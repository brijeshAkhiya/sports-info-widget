import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as fromRoot from "@app/app-reducer";
import * as Soccer from "@store/soccer/soccer.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TournamentListComponent implements OnInit {
  tournamentlist: any;
  searchText;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new Soccer.LoadSoccerTournamentList())
    this.store.select('Soccer').subscribe((data: any) => {
      if (data.tournamentlist.length > 0) {
        this.tournamentlist = data.tournamentlist
      }
    })
  }

}
