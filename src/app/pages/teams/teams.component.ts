import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  sport;
  tournamentid;
  teams;
  paramsWidget = {}
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public cricketService: CricketService,
    public commonService: CommonService
    ) {  }

  ngOnInit() {
    let data:any = this.activatedRoute.data
    let routeParams = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot);
    console.log(routeParams);
    
    this.sport = data.value.sport;
    this.tournamentid = this.activatedRoute.parent.snapshot.params.id
    if(this.sport == 'cricket'){
      this.paramsWidget = { title: 'Current Series', type : 'currentseries', sport : this.sport, tournament : this.tournamentid }
      this.getTournamentTeams(this.tournamentid);
    }

  }

  //Cricket - Get tournament teams
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
