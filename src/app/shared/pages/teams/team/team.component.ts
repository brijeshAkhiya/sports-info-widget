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
  seasons: any = { 'year': [], 'type': [] };
  filter: any = {};

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
        this.getSeasons();
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [this.routeParams.teamid] } };
        this.sportsService.getBasketballteamprofile(this.routeParams.teamid).subscribe(this.profileSuccess, this.profileError);
        break;
      } case 'Hockey': {
        this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Hockey', aIds: [this.commonService.getIds(this.routeParams.teamid, 'Hockey', 'competitor')] } };
        this.sportsService.getHockeyTeamProfile(this.commonService.getIds(this.routeParams.teamid, 'Hockey', 'competitor')).subscribe(this.profileSuccess, this.profileError);
        this.paramsFixtures.loading = true;
        this.sportsService.getHockeyTeamSummary(this.commonService.getIds(this.routeParams.teamid, 'Hockey', 'competitor')).subscribe(this.fixtureSuccess, this.fixtureError);
        break;
      }
    }
  }

  profileSuccess = (res) => {
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
      case 'Hockey': {
        if (res.data)
          this.teamProfile = res.data;
        break;
      }
    }

  }

  profileError = (err) => {
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
      case 'Basketball':
        this.sportsService.getBasketballteamFixtures(this.filter.year, this.filter.type,
          this.routeParams.teamid).subscribe(this.fixtureSuccess, this.fixtureError);
        break;
      case 'Hockey': {
        if (this.paramsFixtures.data.length == 0)
          this.sportsService.getHockeyTeamSummary(this.commonService.getIds(this.routeParams.teamid, 'Hockey', 'competitor')).subscribe(this.fixtureSuccess, this.fixtureError);
        else
          this.paramsFixtures.loading = false;
        break;
      }
    }
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        if (res.data.seasons) {
          if (!localStorage.getItem('filteryear')) {
            this.filter.year = res.data.seasons[res.data.seasons.length - 1].year;
            localStorage.setItem('filteryear', this.filter.year);
            this.filter.type = res.data.seasons[res.data.seasons.length - 1].type.code;
            localStorage.setItem('filtertype', this.filter.type);
          } else {
            this.filter.year = localStorage.getItem('filteryear');
            this.filter.type = localStorage.getItem('filtertype');
          }
        }

        let years = [];
        let typecode = [];
        res.data.seasons.forEach(element => {
          /* get unique seasons.type.code */
          typecode.push(element.type.code);
          /* get unique seasons.year */
          years.push(element.year);
        });
        this.seasons.year.push(years.filter(this.onlyUnique));
        this.seasons.type.push(typecode.filter(this.onlyUnique));
        this.getSportFixtures();
        this.getSportResults();
      }
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  filterData(params) {
    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    this.getSportFixtures();
    this.getSportResults();
    localStorage.setItem('filteryear', this.filter.year);
    localStorage.setItem('filtertype', this.filter.type);

  }

  fixtureSuccess = (res) => {
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
      case 'Basketball': {
        this.paramsFixtures.data = [];
        let filteredData = res.data.filter((match) => match.status == 'scheduled');
        this.paramsFixtures.data = this.commonService.sortArr(filteredData, 'Do MMMM YYYY', 'scheduled', 'asc');
        break;
      }
      case 'Hockey': {
        this.paramsFixtures.data = [];
        this.paramsFixtures.data = this.commonService.sortArrByEvent(res.data.summaries, 'Do MMMM YYYY', 'start_time', 'desc');
        break;
      }
    }
  }

  fixtureError = (err) => {
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
      case 'Basketball':
        this.sportsService.getBasketballteamFixtures(this.filter.year, this.filter.type,
          this.routeParams.teamid).subscribe(this.resultSuccess, this.resultError);
        break;
      case 'Hockey': {
        if (this.paramsResults.data.length == 0)
          this.sportsService.getHockeyTeamSummary(this.commonService.getIds(this.routeParams.teamid, 'Hockey', 'competitor')).subscribe(this.resultSuccess, this.resultError);
        else
          this.paramsResults.loading = false;
        break;
      }
      default:
      // code block

    }
  }

  resultSuccess = (res) => {
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
      case 'Basketball': {
        this.paramsResults.data = [];
        let filteredData = res.data.filter((match) => match.status == 'closed');
        this.paramsResults.data = this.commonService.sortArr(filteredData, 'Do MMMM YYYY', 'scheduled', 'desc');
        break;
      }
      case 'Hockey': {
        this.paramsFixtures.data = [];
        let filteredData = res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started');
        this.paramsFixtures.data = this.commonService.sortArr(filteredData, 'Do MMMM YYYY', 'start_time', 'asc');
        this.paramsResults.data = [];
        filteredData = res.data.summaries.filter((match) => match.sport_event_status.status == 'closed');
        this.paramsResults.data = this.commonService.sortArr(filteredData, 'Do MMMM YYYY', 'start_time', 'desc');
        break;
      }
    }

  }

  resultError = (err) => {
    this.paramsResults.loading = false;
  }

}
