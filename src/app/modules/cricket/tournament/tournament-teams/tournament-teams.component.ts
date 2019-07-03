import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournament-teams',
  templateUrl: './tournament-teams.component.html',
  styleUrls: ['./tournament-teams.component.css']
})
export class TournamentTeamsComponent implements OnInit {

  teams;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService
    ) { }

  ngOnInit() {
    let id = atob(this.activatedRoute.parent.snapshot.params.id)
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
