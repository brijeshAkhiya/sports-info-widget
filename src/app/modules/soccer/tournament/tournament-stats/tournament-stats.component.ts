import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from '@app/shared/providers/common-service';
import { SportsService } from '@app/shared/providers/sports-service';

@Component({
  selector: 'app-tournament-stats',
  templateUrl: './tournament-stats.component.html',
  styleUrls: ['./tournament-stats.component.css']
})
export class TournamentStatsComponent implements OnInit {
  tournamentid: string;
  stats: any = [];
  players: any[];

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'soccer', 'tournament');
    this.getSoccerSeasonLeaders(this.tournamentid);
  }

  //get soccer season leaders
  getSoccerSeasonLeaders(id) {
    this.sportsService.getSoccerseasonleaders(id).subscribe((res: any) => {
      console.log('soccer-leaders', res);
      this.stats = res.data.lists
      this.getdata('goals');
    })
  }

  getdata(type) {
    console.log('type:',type);
    let array = []
    this.players = []
    this.stats.map((data) => {
      if (data.type == type) {
        data.leaders.map((ldata) => {
          ldata.players.map((pdata) => {
            if (array.length < 10) {
              array.push({ rank: ldata.rank, player: pdata })
            }
          })
        })
      }
    })
   
    this.players = array
    console.log('stat-arr', this.players);
  }

}
