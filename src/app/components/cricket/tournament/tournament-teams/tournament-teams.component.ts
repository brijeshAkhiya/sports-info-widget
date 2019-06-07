import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from '../../../../pipes/slugpipe';
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";


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
  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute,private slugifyPipe: SlugifyPipe,private router: Router,
    private cricketService: CricketService, private commonService: CommonService) { }

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

  //get team info 

  teamInfo(id,name){
    let slugname = this.slugifyPipe.transform(name);
    this.router.navigate(['/cricket/team',btoa(this.tournamentid),btoa(id),slugname]);
  }

}
