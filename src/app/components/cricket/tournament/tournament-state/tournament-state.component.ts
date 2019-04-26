import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-state',
  templateUrl: './tournament-state.component.html',
  styleUrls: ['./tournament-state.component.css']
})
export class TournamentStateComponent implements OnInit {
  widget1title = 'Recommended links';
  widget1type = 'currentseries'
  tournamentid: any;
  battingleaders: any;
  bowlingleaders: any;
  fieldingleaders: any;


  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.snapshot.parent.params.id)
    this.getTournamentsLeader();
  }

  getTournamentsLeader() {
    this.sportsService.gettournamentleaders(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.battingleaders = res['data'].batting;
        this.bowlingleaders = res['data'].bowling;
        this.fieldingleaders = res['data'].fielding
      }
    })
  }


}
