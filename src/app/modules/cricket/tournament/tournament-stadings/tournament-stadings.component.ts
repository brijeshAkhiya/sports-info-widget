import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournament-stadings',
  templateUrl: './tournament-stadings.component.html',
  styleUrls: ['./tournament-stadings.component.css']
})
export class TournamentStadingsComponent implements OnInit {
  
  pointstable: any;
  constructor(
    private sportsService: SportsService,
    private activatedroute: ActivatedRoute
    ) { }

  ngOnInit() {
    let id = atob(this.activatedroute.parent.snapshot.params.id)
    this.getTournamentPointsTable(id)
  }

  //get tournaments points table
  getTournamentPointsTable(id) {
    this.sportsService.gettournamentpointstable(id).subscribe((res:any) => {
      if (res.data) {
        res.data.map((data) => {
          this.pointstable = data.team_standings
        })
      }
    })
  }

}
