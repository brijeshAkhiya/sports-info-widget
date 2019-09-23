import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamComponent implements OnInit {

  loading = false;
  loadingFixture = false;
  loadingResult = false;
  statsLoading = false;
  matchfixtures;
  matchresults;
  teamProfile;
  paramArticle = {};
  sport;
  routeParams;
  objectKeys = Object.keys;
  soccerteamplayers = { midfielder: [], forward: [], goalkeeper: [], defender: [], playerstats: [] };
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 0 }, loading: false, loadmore: false, data: [] };
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 0 }, loading: false, loadmore: false, data: [] };

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService
  ) { }

  ngOnInit() {

    const data: any = this.activatedRoute.data;
    this.sport = data.value.sport;
    this.routeParams = this.activatedRoute.snapshot.params;
    this.getSportProfile();
  }

  getSportProfile() {
    this.loading = true;
    switch (this.sport) {
      case 'Cricket': {
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Cricket', aIds: [this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')] }, };
        if (this.routeParams.tournamentid) {
          this.sportsService.getteamprofile(
            this.commonService.getIds(this.routeParams.tournamentid, 'cricket', 'tournament'),
            this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team'))
            .subscribe(this.profileSuccess, this.profileError);
        } else
          this.sportsService.getteamprofileview(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')).subscribe(this.profileSuccess, this.profileError);
        break;
      }
      case 'Kabaddi': {
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [this.routeParams.teamid] } };
        this.sportsService.getkabaddiTeamProfile(this.routeParams.teamid).subscribe(this.profileSuccess, this.profileError);
        break;
      } case 'Soccer': {
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')] } };
        this.sportsService.getsoccerteamprofile(this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')).subscribe(this.profileSuccess, this.profileError);
        break;
      } case 'Basketball': {
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [this.commonService.getIds(this.routeParams.teamid, 'basketball', 'team')] } };
        this.sportsService.getBasketballteamprofile(this.commonService.getIds(this.routeParams.teamid, 'basketball', 'team')).subscribe(this.profileSuccess, this.profileError);
        break;
      }
    }
  }

  profileSuccess = (res) => {
    console.log(res);
    this.loading = false;
    switch (this.sport) {
      case 'Cricket': {
        if (res.data)
          this.teamProfile = res.data;
        break;
      }
      case 'Kabaddi': {
        if (res.data) {
          this.teamProfile = res.data.items[0];
          this.teamProfile.players = [];
          if (this.teamProfile.squads) {
            this.teamProfile.squads.forEach(element => {
              (this.teamProfile.players[element.positionname] = this.teamProfile.players[element.positionname] || []).push(element);
            });
          }
        }
        break;
      }
      case 'Soccer': {
        if (res.data) {
          this.teamProfile = res.data;
          if (this.teamProfile.players && this.teamProfile.players.length > 0) {
            this.teamProfile.players_type = [];
            this.teamProfile.players.map((data) => {
              (this.teamProfile.players_type[data.type] = this.teamProfile.players_type[data.type] || []).push(data);
            });
          }
        }
        break;
      }
      case 'Basketball': {
        if (res.data)
          this.teamProfile = res.data;
        break;
      }
    }
    console.log(this.paramsFixtures.data);

  }

  profileError = (err) => {
    console.log(err);
    this.loading = false;
  }

  /* //soccer team stats */
  getSoccerTeamStats() {
    this.soccerteamplayers.playerstats = [];
    const teamid = this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team');
    const tournamentid = this.commonService.getIds(this.routeParams.tournamentid, 'soccer', 'tournament');
    if (teamid && tournamentid) {
      this.statsLoading = true;
      this.sportsService.getsoccerteamstats(tournamentid, teamid).subscribe((res: any) => {
        this.statsLoading = false;
        if (res.data && res.data.competitor && res.data.competitor.players) {
          res.data.competitor.players.map((pdata) => {
            if (pdata['statistics']) {
              pdata['minutes'] = pdata['statistics']['minutes_played'] ? pdata['statistics']['minutes_played'] : 0;
              pdata['substituted_in'] = pdata['statistics']['substituted_in'] ? pdata['statistics']['substituted_in'] : 0;
              pdata['substituted_out'] = pdata['statistics']['substituted_out'] ? pdata['statistics']['substituted_out'] : 0;
              pdata['goals_scored'] = pdata['statistics']['goals_scored'] ? pdata['statistics']['goals_scored'] : 0;
              pdata['assists'] = pdata['statistics']['assists'] ? pdata['statistics']['assists'] : 0;
              pdata['yellow_cards'] = pdata['statistics']['yellow_cards'] ? pdata['statistics']['yellow_cards'] : 0;
              pdata['red_cards'] = pdata['statistics']['red_cards'] ? pdata['statistics']['red_cards'] : 0;
              this.soccerteamplayers.playerstats.push(pdata);
            }
          });
          console.log('playerstat', this.soccerteamplayers.playerstats);
        }
      }, (error) => {
        this.statsLoading = false;
      });
    }

  }

  getSportFixtures() {
    this.paramsFixtures.reqParams.page += 1;
    this.paramsFixtures.loading = true;
    switch (this.sport) {
      case 'Cricket': {
        this.sportsService.getteamfixtures(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')).subscribe(this.fixtureSuccess, this.fixtureError);
        break;
      }
      case 'Kabaddi':
        this.sportsService.getkabadditeamfixtures(this.routeParams.teamid, this.paramsFixtures).subscribe(this.fixtureSuccess, this.fixtureError);
        break;
      case 'Soccer':
        this.sportsService.getsoccerteamfixtures(this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')).subscribe(this.fixtureSuccess, this.fixtureError);
        break;
    }
  }

  fixtureSuccess = (res) => {
    console.log(res);
    this.paramsFixtures.loading = false;
    switch (this.sport) {
      case 'Cricket': {
        if (res.data)
          this.paramsFixtures.data = this.commonService.sortArr(res.data, 'Do MMMM YYYY', 'scheduled', 'asc');
        break;
      }
      case 'Kabaddi': {
        if (res.data && res.data.items) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'asc'));
        }
        if (res.data.total_pages > this.paramsFixtures.reqParams.page)
          this.paramsFixtures.loadmore = true;
        else
          this.paramsFixtures.loadmore = false;
        break;
      }
      case 'Soccer': {
        this.paramsFixtures.data = [];
        res.data.summaries.map((match) => {
          if (match.sport_event_status.status === 'not_started') {
            match['start_time'] = match.sport_event.start_time;
            this.paramsFixtures.data.push(match);
          }
        });
        this.paramsFixtures.data = this.commonService.sortArr(this.paramsFixtures.data, 'Do MMMM YYYY', 'start_time', 'asc');
        break;
      }
    }
    console.log(this.paramsFixtures.data);

  }

  fixtureError = (err) => {
    console.log(err);
    this.paramsFixtures.loading = false;
  }


  getSportResults() {
    this.paramsResults.reqParams.page += 1;
    this.paramsResults.loading = true;
    switch (this.sport) {
      case 'Cricket': {
        this.sportsService.getteamresults(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')).subscribe(this.resultSuccess, this.resultError);
        break;
      }
      case 'Kabaddi':
        this.sportsService.getkabadditeamfixtures(this.routeParams.teamid, this.paramsResults).subscribe(this.resultSuccess, this.resultError);
        break;
      case 'Soccer':
        this.sportsService.getsoccerteamfixtures(this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')).subscribe(this.resultSuccess, this.resultError);
        break;
      default:
      // code block

    }
  }

  resultSuccess = (res) => {
    console.log(res);
    this.paramsResults.loading = false;
    switch (this.sport) {
      case 'Cricket': {
        if (res.data) {
          this.paramsResults.data = this.commonService.initCompetitorScore(res.data);
          this.paramsResults.data = this.commonService.sortArr(this.paramsResults.data, 'Do MMMM YYYY', 'scheduled', 'desc');
        }
        break;
      }
      case 'Kabaddi': {
        if (res.data && res.data.items) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        if (res.data.total_pages > this.paramsResults.reqParams.page)
          this.paramsResults.loadmore = true;
        else
          this.paramsResults.loadmore = false;
        break;
      }
      case 'Soccer': {
        this.paramsResults.data = [];
        res.data.summaries.map((match) => {
          if (match.sport_event_status.status === 'closed') {
            match['start_time'] = match.sport_event.start_time;
            this.paramsResults.data.push(match);
          }
        });
        this.paramsResults.data = this.commonService.sortArr(this.paramsResults.data, 'Do MMMM YYYY', 'start_time', 'desc');
        break;
      }
    }
    console.log(this.paramsResults.data);

  }

  resultError = (err) => {
    console.log(err);
    this.paramsResults.loading = false;
  }

}
