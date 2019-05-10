import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.css']
})
export class PlayerHomeComponent implements OnInit {
  playerid: any;
  playerprofile: any;
  playerbasic: any;
  playerstats: any;
  totalmatches = 0;
  totalruns = 0;
  totalwicket = 0
  commonnewsparams = {}
  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.playerid = atob(this.activatedroute.snapshot.params.id)
    this.commonnewsparams = {
      eSport: 'Cricket',
      nStart:0,
      nLimit:3,
      aIds: [this.playerid]
    }
    this.getPlayerInfo();
  }

  //get player info 
  getPlayerInfo() {
    this.sportsService.getplayerprofile(this.playerid).subscribe((res) => {
      if (res['data']) {
        this.playerprofile = res['data']
        this.playerbasic = res['data'].player
        this.playerstats = res['data'].statistics
        this.playerstats.map(s => {
          this.totalmatches += s.batting.matches;
          this.totalruns += s.batting.runs;
          this.totalwicket += s.bowling.wickets
        })
      }
    })
  }


}