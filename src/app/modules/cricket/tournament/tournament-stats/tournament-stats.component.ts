import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournament-stats',
  templateUrl: './tournament-stats.component.html',
  styleUrls: ['./tournament-stats.component.css']
})
export class TournamentStatsComponent implements OnInit {

  stats;
  isLoading: boolean = false;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService

  ) { }

  ngOnInit() {
    let id =  this.activatedroute.snapshot.parent.params.id
    this.getTournamentsLeader(id);
}

getTournamentsLeader(id) {
  this.isLoading = true;
  this.sportsService.gettournamentleaders(id).subscribe((res:any) => {
    this.isLoading = false;
    if (res.data) {
      this.stats = res.data
    }
  },(err)=> this.isLoading = false);
}

}
