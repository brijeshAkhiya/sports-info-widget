import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as fromRoot from '@app/app-reducer';
import * as Soccer from '@store/soccer/soccer.actions';
import { Store } from '@ngrx/store';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournamentlist: any;
  loading: boolean = false;
  searchText;
  sport;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    const data: any = this.activatedRoute.data;
    this.sport = data.value.sport;
    this.getTournamentsList();
  }

  getTournamentsList() {
    this.loading = true;
    switch (this.sport) {
      case 'Soccer': {
        this.store.dispatch(new Soccer.LoadSoccerTournamentList());
        this.store.select('Soccer').subscribe((data: any) => {
          this.loading = false;
          if (data.tournamentlist.length > 0) {
            this.tournamentlist = data.tournamentlist;
          }
        });
        break;
      }
      case 'Hockey': {
        this.sportsService.getCompetitions().subscribe((res: any) => {
          this.loading = false;
          if (res.data.competitions && res.data.competitions.length > 0) {
            this.tournamentlist = res.data.competitions;
          }
        });
        break;
      }
    }
  }

}
