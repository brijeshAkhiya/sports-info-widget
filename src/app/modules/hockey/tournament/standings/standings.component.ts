import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import * as HockeySelectors from '@store/selectors/hockey.selectors';
import * as Hockey from '@store/hockey/hockey.actions';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {

  info: any;
  loading = false;
  standings;
  seasons;
  filter;
  hockeySubscription: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    let id = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'hockey', 'tournament');
    this.loading = true;
    this.hockeySubscription = this.store.select(HockeySelectors.getHockeySeasons).subscribe((data: any) => {
      if (Object.keys(data).length == 0 || !Object.keys(data).includes(id))
        this.store.dispatch(new Hockey.LoadHockeyCompSeason(id));
      else {
        this.loading = false;
        this.seasons = data[id];
        let prevSelected: any = localStorage.getItem('Hockey');
        this.filter = prevSelected && this.seasons.filter(season => season.id == JSON.parse(prevSelected).id).length > 0 ? JSON.parse(prevSelected) : this.seasons[0];
        this.getStandings();
      }
    });
  }

  /* get tournaments points table */
  getStandings() {
    this.loading = true;
    this.sportsService.getHockeySeasonStandings(this.filter.id).subscribe((res: any) => {
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
    localStorage.setItem('Hockey', JSON.stringify(season));
  }
  ngOnDestroy() {
    if (this.hockeySubscription) this.hockeySubscription.unsubscribe();
  }

}
