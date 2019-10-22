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
      if (res.data)
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
    if (this.stats) {
      let leaders = this.stats.filter((leader) => leader.type == type && leader.leaders);
      if (leaders.length > 0) {
        leaders[0].leaders.map((ldata) => {
          if (ldata.players !== undefined) {
            ldata.players.map((pdata) => {
              pdata['rank'] = ldata.rank;
              pdata['value'] = pdata.competitors[0].datapoints[0].value;
              if (array.length < 10) {
                array.push(pdata);
              }
            });
          }
        });
      }
    }
    this.isloading = false;
    this.players = array;
  }

  getCarddata() {
    let array = [];
    this.players = [];
    if (this.stats) {
      this.stats.map((data) => {
        if ((data.type == 'red_cards' || data.type == 'yellow_cards') && data.leaders && data.leaders.length > 0) {
          data.leaders.map((ldata) => {
            if (ldata.players && ldata.players.length > 0) {
              ldata.players.map((pdata) => {
                pdata['rank'] = ldata.rank;
                pdata[data.type] = pdata.competitors[0].datapoints[0].value;
                if (array.length < 10) {
                  array.push(pdata);
                }
              });
            }
          });

        }
      });
    }
    this.players = array;
  }


}
