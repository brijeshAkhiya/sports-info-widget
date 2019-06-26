import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService
  ) { }
  ngOnInit() {
    let pageType;
    this.activatedRoute
      .data
      .subscribe(v => pageType = v );

    let id = atob(this.activatedRoute.parent.snapshot.params.id)
    if(pageType.type == 'cricket')
      this.getTournamentTeams(id)
  }

  //get tournament teams
  getTournamentTeams(id) {
    this.sportsService.gettournamentteams(id).subscribe((res:any) => {
      if (res.data) {
        res.data.groups.map((data) => {
          this.teams = data.teams
        })        
      }
    })
  }

}
