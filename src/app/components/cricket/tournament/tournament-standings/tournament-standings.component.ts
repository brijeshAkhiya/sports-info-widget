import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-standings',
  templateUrl: './tournament-standings.component.html',
  styleUrls: ['./tournament-standings.component.css']
})
export class TournamentStandingsComponent implements OnInit {
  widget1title = 'Current Series';
  widget1type = 'currentseries'
  tournamentid: any;
  pointstable: any;

  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.parent.snapshot.params.id)
    this.getTournamentPointsTable()
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

}
