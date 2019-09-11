import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { SlugifyPipe } from '@pipes/slugpipe';
import { SplitPipe } from '@pipes/stringsplitpipe';

import { CommonService } from '@providers/common-service';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {
  tournamentid: string;
  options;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private slugifyPipe: SlugifyPipe,
    private splitpipe: SplitPipe,
    private router: Router,
    private commonService: CommonService
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.tournamentid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'soccer', 'tournament');
    const name = this.activatedroute.snapshot.params.slug;
    this.options = { reqParams:
      { aIds: [this.commonService.getIds(this.activatedroute.snapshot.params.id, 'soccer', 'tournament')], eSport: 'Soccer' },
      title: name.replace(/-/g, ' '), id: this.tournamentid, name: name.replace(/-/g, ' '), type: 'tournament', sport: 'soccer'
    };
  }

}
