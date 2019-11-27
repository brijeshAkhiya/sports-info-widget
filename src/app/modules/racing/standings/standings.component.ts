import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import * as RacingSelectors from '@store/selectors/racing.selectors';
import * as Racing from '@store/racing/racing.actions';

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
  game;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    let params: any = this.activatedroute.parent.params;
    this.game = params.value.game;
    this.loading = true;
    this.selectorSubscription = this.store.select(RacingSelectors.getRacingSeasons).subscribe((data: any) => {
      if (Object.keys(data).length == 0 || !Object.keys(data).includes(this.game))
        this.store.dispatch(new Racing.LoadRacingCompSeason(this.game));
      else {
        this.loading = false;
        this.seasons = data[this.game];
        let prevSelected: any = this.commonService.getFromStorage(this.game);
        this.filter = prevSelected && this.seasons.filter(season => season.id == JSON.parse(prevSelected).id).length > 0 ? JSON.parse(prevSelected) : this.seasons[0];
        this.getStandings();
      }
    });
  }

  /* get tournaments points table */
  getStandings() {
    this.loading = true;
    this.sportsService.getRacingSeasonsSummary(this.game, this.filter.id).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.standings = res.data.stage;
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
    this.commonService.setInStorage(this.game, JSON.stringify(season));

  }
  ngOnDestroy() {
    if (this.selectorSubscription) this.selectorSubscription.unsubscribe();
  }

}
