import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit {

  loading = false;
  sport;
  playerid;
  playerData;
  paramArticle = {};
  stats;
  teamid;
  battingdata = [];
  bowlingdata = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private sportsService: SportsService,
    private commonService: CommonService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    let data: any = this.activatedroute.data;
    this.sport = data.value.sport;
    this.teamid = data.value.team;
    this.getPlayerInfo();

    // if (this.sport == 'cricket') {
    //   this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, this.sport, 'player');
    //   this.getPlayerInfo();
    //   this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Cricket', aIds: [this.playerid] } };
    // } else if (this.sport == 'kabaddi') {
    //   this.playerid = this.activatedroute.snapshot.params.id;
    //   this.getKabbadiPlayerInfo();
    //   if (data.value.team) {
    //     this.teamid = this.activatedroute.snapshot.params.teamid;
    //   }
    //   console.log(this.teamid);

    //   this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [this.playerid] } };
    // } else if (this.sport == 'soccer') {
    //   this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, this.sport, 'player');
    //   this.getSoccerPlayerInfo();
    //   this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [this.playerid] } };
    // }

  }

  getPlayerInfo() {
    this.loading = true;
    switch (this.sport) {
      case 'Cricket': {
        this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'cricket', 'player');
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Cricket', aIds: [this.playerid] } };
        this.sportsService.getplayerprofile(this.playerid).subscribe(this.playerSuccess, this.playerError);
        break;
      }
      case 'Kabaddi': {
        this.playerid = this.activatedroute.snapshot.params.id;
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [this.playerid] } };
        if (this.teamid) {
          this.teamid = this.activatedroute.snapshot.params.teamid;
        }
        this.sportsService.getKabaddiPlayerprofile(this.playerid).subscribe(this.playerSuccess, this.playerError);
        break;
      }
      case 'Soccer': {
        this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, this.sport, 'player');
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [this.playerid] } };
        this.sportsService.getsoccerplayerinfo(this.playerid).subscribe(this.playerSuccess, this.playerError);
        break;
      }
    }
  }

  playerSuccess = (res) => {
    console.log(res);
    this.loading = false;
    switch (this.sport) {
      case 'Cricket': {
        break;
      }
      case 'Kabaddi': {
        break;
      }
      case 'Soccer': {
        break;
      }
    }
  }

  playerError = (err) => {
    console.log(err);
    this.loading = false;
  }

  getPlayerInfo2() {
    this.loading = true;
    this.sportsService.getplayerprofile(this.playerid).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.playerData = res.data;
        console.log('statas::', res);

        if (res.data.statistics) {
          let obj = { Matches: 0, Runs: 0, Wickets: 0 };
          res.data.statistics.map(s => {
            obj.Matches += s.batting.matches;
            obj.Runs += s.batting.runs;
            obj.Wickets += s.bowling.wickets;
          });
          this.stats = Object.keys(obj).map(key => ({ key, data: obj[key] }));
          console.log(this.stats);

          /*  //short table batting & bowling */
          this.playerData.statistics.map(element => {
            element.batting['type'] = element.type;
            element.bowling['type'] = element.type;
            this.battingdata.push(element.batting);
            this.bowlingdata.push(element.bowling);
          });


        }
      }
    },
      (error) => {
        this.loading = false;
      });
  }


  getKabbadiPlayerInfo() {
    this.loading = true;
    this.sportsService.getKabaddiPlayerprofile(this.playerid).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.playerData = res.data.items.player_info;
        if (res.data.items.stats) {
          let obj = { 'Matches': 0, 'Raid Points': 0, 'Tackle Points': 0 };
          res.data.items.stats.map(s => {
            obj['Matches'] += (s.matchplayed != '') ? s.matchplayed : 0;
            obj['Raid Points'] += (s.totalraidpoint != '') ? s.totalraidpoint : 0;
            obj['Tackle Points'] += (s.totaltacklepoint != '') ? s.totaltacklepoint : 0;
          });
          this.stats = Object.keys(obj).map(key => ({ key, data: obj[key] }));
        }
      }
    },
      (error) => {
        this.loading = false;
      });
  }

  getSoccerPlayerInfo() {
    this.loading = true;
    this.sportsService.getsoccerplayerinfo(this.playerid).subscribe((res: any) => {
      this.loading = false;
      console.log(res.data);

      if (res.data) {
        this.playerData = res.data;
      }
    },
      (error) => {
        this.loading = false;
      });
  }
}
