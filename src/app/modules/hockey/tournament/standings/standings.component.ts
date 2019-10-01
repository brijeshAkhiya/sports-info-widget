import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  info: any;
  loading = false;
  standings;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    let id = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'hockey', 'tournament');
    this.getStandings(id);
  }

  /* get tournaments points table */
  getStandings(id) {
    this.loading = true;
    this.sportsService.getHockeySeasonStandings('sr:season:4588').subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.standings = res.data.standings[0];
      }
    },
      error => {
        this.loading = false;
      });
  }

}
