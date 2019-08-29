import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  loading: boolean = false;
  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;
  teamProfile;
  paramArticle = {}
  sport;
  routeParams;
  objectKeys = Object.keys
  soccerteamplayers = { midfielder: [], forward: [], goalkeeper: [], defender: [], playerstats: [] }
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] }

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public cricketService: CricketService,
    public commonService: CommonService
  ) { }

  ngOnInit() {

    let data: any = this.activatedRoute.data;
    this.sport = data.value.sport;
    console.log(this.sport);

    this.routeParams = this.activatedRoute.snapshot.params
    if (this.sport == 'cricket') {
      this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Cricket', aIds: [this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')] }, }
      if (this.routeParams.tournamentid)
        this.getTournamentTeamProfile(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team'), this.commonService.getIds(this.routeParams.tournamentid, 'cricket', 'tournament'))
      else
        this.getTeamProfile(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team'));
    }
    else if (this.sport == 'kabaddi') {
      this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Kabaddi', aIds: [this.routeParams.teamid] } }
      this.getKabaddiTeamProfile(this.routeParams.teamid);
    }
    else if (this.sport == 'soccer') {
      console.log(this.routeParams.tournamentid);

      this.paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')] } }
      this.getSoccerTeamProfile(this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team'))
    }
  }

  getTeamProfile(teamid) {
    this.loading = true;
    if (teamid) {
      this.sportsService.getteamprofileview(teamid).subscribe((res: any) => {
        this.loading = false;
        if (res.data)
          this.teamProfile = res.data
      }, (error) => {
        this.loading = false;
      })
    }
  }

  getTournamentTeamProfile(teamid, tournamentid) {
    this.loading = true;
    if (teamid && tournamentid) {
      this.sportsService.getteamprofile(tournamentid, teamid).subscribe((res: any) => {
        this.loading = false;
        if (res.data)
          this.teamProfile = res.data
      }, (error) => {
        this.loading = false;
      })
    }
  }


  getTeamResults() {
    if (this.matchresults && this.matchresults.length > 0)
      return false;
    this.loadingResult = true;
    this.sportsService
      .getteamresults(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team'))
      .subscribe((res: any) => {
        this.loadingResult = false;
        if (res.data) {
          this.matchresults = this.cricketService.initCompetitorScore(res.data)
          this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled', 'desc');
        }
      }, (error) => {
        this.loadingResult = false;
      });
  }

  getTeamFixtures() {
    if (this.matchfixtures && this.matchfixtures.length > 0)
      return false;
    this.loadingFixture = true;
    this.sportsService.getteamfixtures(this.commonService.getIds(this.routeParams.teamid, 'cricket', 'team')).subscribe((res: any) => {
      this.loadingFixture = false;
      if (res.data.schedule)
        this.matchfixtures = this.commonService.sortArr(res.data.schedule, 'Do MMMM YYYY', 'scheduled', 'asc');
    }, (error) => {
      this.loadingFixture = false;
    });

  }


  getKabaddiTeamProfile(teamid) {
    this.loading = true;
    if (teamid) {
      this.sportsService.getkabaddiTeamProfile(teamid).subscribe((res: any) => {
        this.loading = false;
        if (res.data)
          this.teamProfile = res.data.items[0]
        this.teamProfile.players = [];
        this.teamProfile.squads.forEach(element => {
          (this.teamProfile.players[element.positionname] = this.teamProfile.players[element.positionname] || []).push(element);
        });
        console.log(this.teamProfile);
        console.log(Object.keys(this.teamProfile.players));

      }, (error) => {
        this.loading = false;
      })
    }
  }



  loadData(type) {
    if (type == 'fixture') {
      if (this.paramsFixtures.data && this.paramsFixtures.data.length > 0)
        return false;
      this.getFixtures();
    }
    else if (type == 'result') {
      if (this.paramsResults.data && this.paramsResults.data.length > 0)
        return false;
      this.getResults();
    }
  }

  getFixtures() {
    console.log("getFixtures")
    this.paramsFixtures.loading = true;
    this.sportsService.getkabadditeamfixtures(this.routeParams.teamid, this.paramsFixtures).subscribe((res: any) => {
      this.paramsFixtures.loading = false;
      if (res.data && res.data.items) {
        this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'asc'));
      }
      if (res.data.total_pages > this.paramsFixtures.reqParams.page)
        this.paramsFixtures.loadmore = true;
      else
        this.paramsFixtures.loadmore = false;
    }, (error) => {
      this.paramsFixtures.loading = false;
    });
  }



  getResults() {

    this.paramsResults.loading = true;
    this.sportsService
      .getkabadditeamfixtures(this.routeParams.teamid, this.paramsResults)
      .subscribe((res: any) => {
        this.paramsResults.loading = false;
        if (res.data && res.data.items) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        if (res.data.total_pages > this.paramsResults.reqParams.page)
          this.paramsResults.loadmore = true;
        else
          this.paramsResults.loadmore = false;
      }, (error) => {
        this.paramsResults.loading = false;
      });
  }


  //soccer team profile 
  getSoccerTeamProfile(teamid) {
    this.loading = true;
    if (teamid) {
      this.sportsService.getsoccerteamprofile(teamid).subscribe((res: any) => {
        this.loading = false;
        if (res.data)
          this.teamProfile = res.data
        if(this.teamProfile.players && this.teamProfile.players.length > 0){
          this.teamProfile.players.map((data) => {
            if (data.type == 'defender') {
              this.soccerteamplayers.defender.push(data)
            }
            else if (data.type == 'midfielder') {
              this.soccerteamplayers.midfielder.push(data)
            }
            else if (data.type == 'forward') {
              this.soccerteamplayers.forward.push(data)
            }
            else if (data.type == 'goalkeeper') {
              this.soccerteamplayers.goalkeeper.push(data)
            }
          })
        }
      }, (error) => {
        this.loading = false;
      })
    }
  }

  //soccer team fixtures
  getsoccerTeamFixtures() {
    if (this.matchfixtures && this.matchfixtures.length > 0)
      return false;
    this.loadingFixture = true;
    this.sportsService.getsoccerteamfixtures(this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')).subscribe((res: any) => {
      this.loadingFixture = false;
      this.matchfixtures = []
      res.data.summaries.map((match) => {
        if (match.sport_event_status.status == 'not_started') {
          match['start_time'] = match.sport_event.start_time
          this.matchfixtures.push(match)
        }
      })
      this.matchfixtures = this.commonService.sortArr(this.matchfixtures, 'Do MMMM YYYY', 'start_time', 'asc')
      console.log('match::', this.matchfixtures);
    }, (error) => {
      this.loadingFixture = false;
    });

  }

  //soccer team stats 
  getSoccerTeamStats() {
    this.soccerteamplayers.playerstats = []
    let teamid = this.commonService.getIds(this.routeParams.teamid, 'soccer', 'team')
    let tournamentid = this.commonService.getIds(this.routeParams.tournamentid, 'soccer', 'tournament')
    if (teamid && tournamentid) {
      this.loading = true
      this.sportsService.getsoccerteamstats(tournamentid, teamid).subscribe((res: any) => {
        if (res.data)
          res.data.competitor.players.map((pdata) => {
            
            
            pdata['minutes'] = pdata['statistics']['minutes_played'] ? pdata['statistics']['minutes_played'] : 0
            pdata['substituted_in'] = pdata['statistics']['substituted_in'] ? pdata['statistics']['substituted_in'] : 0
            pdata['substituted_out'] = pdata['statistics']['substituted_out'] ? pdata['statistics']['substituted_out'] : 0
            pdata['goals_scored'] = pdata['statistics']['goals_scored'] ? pdata['statistics']['goals_scored'] : 0
            pdata['assists'] = pdata['statistics']['assists'] ? pdata['statistics']['assists'] : 0
            pdata['yellow_cards'] = pdata['statistics']['yellow_cards'] ? pdata['statistics']['yellow_cards'] : 0
            pdata['red_cards'] = pdata['statistics']['red_cards'] ? pdata['statistics']['red_cards'] : 0
            this.soccerteamplayers.playerstats.push(pdata)
            this.loading = false;
          })
        console.log('playerstat', this.soccerteamplayers.playerstats);
      }, (error) => {
        this.loading = false;
      })
    }

  }

  loadmore(type) {
    if (type == 'fixture') {
      this.paramsFixtures.reqParams.page += 1;
      this.getFixtures();
    }
    else if (type == 'result') {
      this.paramsResults.reqParams.page += 1;
      this.getResults();
    }
  }
}
