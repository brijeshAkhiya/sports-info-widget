import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from '../../../../pipes/slugpipe';
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

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
  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute,private slugifyPipe: SlugifyPipe,private router: Router,
    private cricketService: CricketService, private commonService: CommonService
    ) { }

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

   //get team info 

   teamInfo(id,name){
    let slugname = this.slugifyPipe.transform(name);
    this.router.navigate(['/cricket/team',btoa(this.tournamentid),btoa(id),slugname]);
  }


}
