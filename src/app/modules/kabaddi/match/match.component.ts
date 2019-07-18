import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  loading: boolean = false;
  matchInfo;
  commentry;

  constructor(
    private sportsService: SportsService,
    private activatedroute: ActivatedRoute
  ) {     
  }

  ngOnInit() {
    this.getMatchInfo(this.activatedroute.snapshot.params.id)
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getMatchInfo(id).subscribe((res: any) => {      
      this.loading = false;
      if(res.data){
        let home = 0;
        let away = 0;
        this.matchInfo = res.data.items;
        if(!(res.data.items.event && res.data.items.event != ''))
          return false;
          
        this.commentry = res.data.items.event;

        let extraRun = {'allout' : 2, 'card' : 1, 'super_raid' :1, 'super_tackle' : 1}
        this.commentry.forEach((match, index) => { 
          this.commentry[index].point_home_plus = (home+= (match.point_home ? match.point_home : 0));
          this.commentry[index].point_away_plus = (away+= (match.point_away ? match.point_away : 0));
          if(this.commentry[index].allout == "true"){
            if(match.bounus == ''){
              if(match.allout_team_id == this.matchInfo.match_info.teams.home.tid)
                this.commentry[index].point_away_plus = (away+= extraRun.allout);
              else if(match.allout_team_id == this.matchInfo.match_info.teams.away.tid)
                this.commentry[index].point_home_plus = (home+= extraRun.allout);
            }
          }
        });        
      }
    }, (error) => {
      this.loading = false;
    });
  }

}
