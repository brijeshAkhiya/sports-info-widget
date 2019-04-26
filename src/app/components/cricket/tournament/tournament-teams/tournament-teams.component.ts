import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-teams',
  templateUrl: './tournament-teams.component.html',
  styleUrls: ['./tournament-teams.component.css']
})
export class TournamentTeamsComponent implements OnInit {
  tournamentid: any;
  teamsname: any;
  widget1title = 'Current Series';
  widget1type = 'currentseries'
  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.parent.snapshot.params.id)
    this.getTournamentTeams()
  }

  //get tournament teams

  getTournamentTeams() {
    this.sportsService.gettournamentteams(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        res['data'].groups.map((data) => {
          this.teamsname = data.teams
        })
      }
    })
  }

}
