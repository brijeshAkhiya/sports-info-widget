import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {
  tournamentid: any;

  battingleaders: any;
  bowlingleaders: any;
  pointstable: any;
  teamsname: any;

  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.snapshot.params.id)
    this.getTournamentsLeader();
    this.getTournamentPointsTable();
    this.getTournamentTeams();
  }

  getTournamentsLeader() {
    this.sportsService.gettournamentleaders(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.battingleaders = res['data'].batting.top_runs;
        this.bowlingleaders = res['data'].bowling.top_wickets;
      }
    })
  }

  //get tournaments points table

  getTournamentPointsTable() {
    this.sportsService.gettournamentpointstable(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        res['data'].map((data) => {
          this.pointstable = data.team_standings
        })
      }
    })
  }

  //get tournament teams

  getTournamentTeams(){
    this.sportsService.gettournamentteams(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        res['data'].groups.map((data) => {
            this.teamsname = data.teams
        })
      }
    })
  }


}
