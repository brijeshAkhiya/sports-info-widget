import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import * as BadmintonSelectors from '@store/selectors/badminton.selectors';
import * as Badminton from '@store/badminton/badminton.actions';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit, OnDestroy {

  info: any;
  loading = false;
  standings;
  seasons;
  filter;
  selectorSubscription: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    let id = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'Badminton', 'tournament');

    this.loading = true;
    this.selectorSubscription = this.store.select(BadmintonSelectors.getBadmintonSeasons).subscribe((data: any) => {
      if (Object.keys(data).length == 0 || !Object.keys(data).includes(id))
        this.store.dispatch(new Badminton.LoadBadmintonCompSeason(id));
      else {
        this.loading = false;
        this.seasons = data[id];
        this.filter = localStorage.getItem('Badminton') ? JSON.parse(localStorage.getItem('Badminton')) : this.seasons[0];
        this.getStandings();
      }
    });
  }

  /* get tournaments points table */
  getStandings() {
    this.loading = true;
    this.sportsService.getBadmintonSeasonStandings(this.filter.id).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.standings = res.data.standings[0];
      }
    },
      error => {
        this.loading = false;
      });
  }

  filterHockeySeason(season) {
    this.filter = season;
    this.standings = [];
    this.loading = true;
    this.getStandings();
    localStorage.setItem('Badminton', JSON.stringify(season));

  }
  ngOnDestroy() {
    if (this.selectorSubscription) this.selectorSubscription.unsubscribe();
  }

}
