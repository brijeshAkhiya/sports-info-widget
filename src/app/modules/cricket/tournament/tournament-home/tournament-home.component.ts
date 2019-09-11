import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { SlugifyPipe } from "@pipes/slugpipe";
import { SplitPipe } from '@pipes/stringsplitpipe';

import { CommonService } from '@providers/common-service';
import { SportsService } from '@providers/sports-service';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

  options: any;
  tournamentid: any;
  battingleaders:any;
  bowlingleaders:any;
  pointstable: any;
  tournamentname: any;
  teamsname: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private slugifyPipe: SlugifyPipe,
    private splitpipe: SplitPipe,
    private router: Router,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    let temp: Array<any> = [this.commonService.getIds(this.activatedroute.snapshot.params.id,'cricket','tournament')]
    this.tournamentid = this.commonService.getIds(this.activatedroute.snapshot.params.id,'cricket','tournament');
    let name = this.activatedroute.snapshot.params.slug
    this.options = { reqParams: { aIds: [this.commonService.getIds(this.activatedroute.snapshot.params.id,'cricket','tournament')],eSport:'Cricket' }, title: name.replace(/-/g, " "),id:this.tournamentid,name:name.replace(/-/g, " "),type:'tournament' ,sport:'cricket'}
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
        this.tournamentname = res['data'].season_name;
        res['data'].groups.map((data) => {
            this.teamsname = data.teams  
        })
      }
    })
  }


}
