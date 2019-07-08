import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit {
  
  loading: boolean = false;
  sport;
  playerid;
  playerData;
  paramArticle = {}
  stats;

  constructor(
    private activatedroute: ActivatedRoute, 
    private router: Router,
    private sportsService: SportsService, 
    private cricketService: CricketService, 
    private commonService: CommonService, 
  ) { }

  ngOnInit() {
    let data:any = this.activatedroute.data;
    this.sport = data.value.sport;
    this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id,'cricket','player')
    this.paramArticle = { reqParams : { nStart: 0, nLimit: 10, aIds: [this.playerid] }, sport : this.sport }
    this.getPlayerInfo();
  }

  getPlayerInfo() {
    this.loading = true;
    this.sportsService.getplayerprofile(this.playerid).subscribe((res:any) => {
      this.loading = false;
      if (res.data) {
        this.playerData = res.data
        if (res.data.statistics) {
          let obj = {Matches : 0, Runs: 0, Wickets : 0};
          res.data.statistics.map(s => {
            obj.Matches += s.batting.matches;
            obj.Runs += s.batting.runs;
            obj.Wickets += s.bowling.wickets
          })
          this.stats =  Object.keys(obj).map(key => ({ key, data: obj[key] }));
          console.log(this.stats);
          
        }
      }
    },
      (error) => {
        this.loading = false;
      })
  }
}
