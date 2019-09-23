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
  isloading;
  sport = 'Soccer';

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'soccer', 'tournament');
    this.getSoccerSeasonLeaders(this.tournamentid);
  }

  /*  //get soccer season leaders */
  getSoccerSeasonLeaders(id) {
    this.isloading = true;
    this.sportsService.getSoccerseasonleaders(id).subscribe((res: any) => {
      this.isloading = false;
      this.stats = res.data.lists;
      this.getdata('goals');
    }, (error) => {
      this.isloading = false;
    });
  }

  getdata(type) {
    let array = [];
    this.players = [];
    this.isloading = true;
    this.stats.map((data) => {
      if (data.type == type) {
        data.leaders.map((ldata) => {
          ldata.players.map((pdata) => {
            pdata['rank'] = ldata.rank;
            pdata['value'] = pdata.competitors[0].datapoints[0].value;
            if (array.length < 10) {
              array.push(pdata);
            }
          });
        });
      }
    });
    this.isloading = false;
    this.players = array;
  }

  getCarddata() {
    let array = [];
    this.players = [];
    this.stats.map((data) => {
      if (data.type == 'red_cards' || data.type == 'yellow_cards') {
        data.leaders.map((ldata) => {
          ldata.players.map((pdata) => {
            pdata['rank'] = ldata.rank;
            pdata[data.type] = pdata.competitors[0].datapoints[0].value;
            if (array.length < 10) {
              array.push(pdata);
            }
          });
        });
      }
    });
    this.players = array;
  }


}
