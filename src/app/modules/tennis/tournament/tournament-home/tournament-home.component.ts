import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html'
})
export class TournamentHomeComponent implements OnInit {
  tournamentid: string;
  options;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.tournamentid = 'sr:tournament:' + this.activatedroute.snapshot.params.id;
    const name = this.activatedroute.snapshot.params.slug;
    this.options = {
      title: name.replace(/-/g, ' '),
      id: this.tournamentid,
      name: name.replace(/-/g, ' '),
      type: 'tournament',
      sport: 'Tennis',
      reqParams:
      {
        aIds: [this.tournamentid],
        eSport: 'Tennis'
      },
    };
  }

}
