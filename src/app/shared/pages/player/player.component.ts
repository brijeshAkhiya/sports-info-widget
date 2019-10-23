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
        this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'soccer', 'player');
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [this.playerid] } };
        this.sportsService.getsoccerplayerinfo(this.playerid).subscribe(this.playerSuccess, this.playerError);
        break;
      }
      case 'Basketball': {
        this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'basketball', 'player');
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [this.playerid] } };
        this.sportsService.getBasketballPlayerInfo(this.playerid).subscribe(this.playerSuccess, this.playerError);
        break;
      } case 'Racing': {
        let parentParams: any = this.activatedroute.parent.params;
        this.playerid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'Racing', 'competitor');
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Racing', aIds: [this.playerid] } };
        this.sportsService.getRacingCompetitorProfile(parentParams.value.game, this.playerid).
          subscribe(this.playerSuccess, this.playerError);
        break;
      }
    }
  }

  playerSuccess = (res) => {
    this.loading = false;
    switch (this.sport) {
      case 'Cricket': {
        this.playerData = res.data;
        if (res.data.statistics) {
          let obj = { Matches: 0, Runs: 0, Wickets: 0 };
          res.data.statistics.map(s => {
            obj.Matches += s.batting.matches;
            obj.Runs += s.batting.runs;
            obj.Wickets += s.bowling.wickets;
          });
          this.stats = Object.keys(obj).map(key => ({ key, data: obj[key] }));

          /*  //short table batting & bowling */
          this.playerData.statistics.map(element => {
            element.batting['type'] = element.type;
            element.bowling['type'] = element.type;
            this.battingdata.push(element.batting);
            this.bowlingdata.push(element.bowling);
          });
        }
        break;
      }
      case 'Kabaddi': {
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
        break;
      }
      case 'Soccer': {
        if (res.data) {
          this.playerData = res.data;
        }
        break;
      }
      case 'Basketball': {
        if (res.data) {
          this.playerData = res.data;
          if (res.data.seasons && res.data.seasons.length > 0) {
            this.playerData.teams = [];
            let obj = { 'PPG': 0, 'REB': 0, 'AST': 0, 'PER': 0, };
            res.data.seasons.forEach((season, key) => {
              if (season.teams && season.teams.length > 0) {
                season.teams.forEach(team => {
                  if (this.playerData.teams.some((teamObj) => teamObj.sr_id == team.sr_id) == false) {
                    this.playerData.teams.push(team);
                  }
                  if (key == 0) {
                    obj['PPG'] += (team.average.points != '') ? team.average.points : 0;
                    obj['REB'] += (team.average.rebounds != '') ? team.average.rebounds : 0;
                    obj['AST'] += (team.average.assists != '') ? team.average.assists : 0;
                    obj['PER'] += (team.average.efficiency != '') ? team.average.efficiency : 0;
                  }
                });
              }
            });
            this.stats = Object.keys(obj).map(key => ({ key, data: (obj[key] / res.data.seasons[0].teams.length).toFixed(2) }));
          }
        }
        break;
      }
      case 'Racing': {
        if (res.data) {
          this.playerData = res.data;
        }
        break;
      }
    }
  }

  playerError = (err) => {
    this.loading = false;
  }

  getPlayerInfo2() {
    this.loading = true;
    this.sportsService.getplayerprofile(this.playerid).subscribe((res: any) => {
      this.loading = false;
      if (res.data) {
        this.playerData = res.data;

        if (res.data.statistics) {
          let obj = { Matches: 0, Runs: 0, Wickets: 0 };
          res.data.statistics.map(s => {
            obj.Matches += s.batting.matches;
            obj.Runs += s.batting.runs;
            obj.Wickets += s.bowling.wickets;
          });
          this.stats = Object.keys(obj).map(key => ({ key, data: obj[key] }));

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
      if (res.data) {
        this.playerData = res.data;
      }
    },
      (error) => {
        this.loading = false;
      });
  }
}
