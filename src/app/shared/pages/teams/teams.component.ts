import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/app-reducer';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import * as HockeySelectors from '@store/selectors/hockey.selectors';
import * as Hockey from '@store/hockey/hockey.actions';
import * as BadmintonSelectors from '@store/selectors/badminton.selectors';
import * as Badminton from '@store/badminton/badminton.actions';
import * as RacingSelectors from '@store/selectors/racing.selectors';
import * as Racing from '@store/racing/racing.actions';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {

  sport;
  tournamentid;
  teams;
  isloading: boolean = true;
  seasons;
  filter;
  subscription;
  game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    const data: any = this.activatedRoute.data;
    this.sport = data.value.sport;
    this.getSportTeams();
  }

  getSportTeams() {
    this.isloading = true;
    switch (this.sport) {
      case 'Cricket': {
        this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'cricket', 'tournament');
        this.sportsService.gettournamentteams(this.tournamentid).subscribe(this.teamSuccess, this.teamError);
        break;
      }
      case 'Kabaddi':
        this.sportsService.getkabadditeams().subscribe(this.teamSuccess, this.teamError);
        break;
      case 'Soccer': {
        this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'soccer', 'tournament');
        this.sportsService.getsoccerseasonteams(this.tournamentid).subscribe(this.teamSuccess, this.teamError);
        break;
      }
      case 'Basketball': {
        this.sportsService.getBaskeballTeams().subscribe(this.teamSuccess, this.teamError);
        break;
      }
      case 'Hockey': {
        this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'Hockey', 'season');
        this.subscription = this.store.select(HockeySelectors.getHockeySeasons).subscribe((data: any) => {
          if (Object.keys(data).length == 0 || !Object.keys(data).includes(this.tournamentid))
            this.store.dispatch(new Hockey.LoadHockeyCompSeason(this.tournamentid));
          else {
            this.seasons = data[this.tournamentid];
            let prevSelected: any = this.commonService.getFromStorage(this.sport);
            this.filter = prevSelected && this.seasons.filter(season => season.id == JSON.parse(prevSelected).id).length > 0 ? JSON.parse(prevSelected) : this.seasons[0];
            this.sportsService.getHockeySeasonInfo(this.filter.id).subscribe(this.teamSuccess, this.teamError);
          }
        });
        break;
      }
      case 'Badminton': {
        this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'Badminton', 'season');
        this.subscription = this.store.select(BadmintonSelectors.getBadmintonSeasons).subscribe((data: any) => {
          if (Object.keys(data).length == 0 || !Object.keys(data).includes(this.tournamentid))
            this.store.dispatch(new Badminton.LoadBadmintonCompSeason(this.tournamentid));
          else {
            this.seasons = data[this.tournamentid];
            let prevSelected: any = this.commonService.getFromStorage(this.sport);
            this.filter = prevSelected && this.seasons.filter(season => season.id == JSON.parse(prevSelected).id).length > 0 ? JSON.parse(prevSelected) : this.seasons[0];
            this.sportsService.getBadmintonSeasonInfo(this.filter.id).subscribe(this.teamSuccess, this.teamError);
          }
        });
        break;
      }
      case 'Racing': {
        this.isloading = false;
        let params: any = this.activatedRoute.parent.params;
        this.game = params.value.game;
        this.subscription = this.store.select(RacingSelectors.getRacingSeasons).subscribe((data: any) => {
          if (Object.keys(data).length == 0 || !Object.keys(data).includes(this.game))
            this.store.dispatch(new Racing.LoadRacingCompSeason(this.game));
          else {
            this.isloading = true;
            this.seasons = data[this.game];
            let prevSelected: any = this.commonService.getFromStorage(this.game);
            this.filter = prevSelected && this.seasons.filter(season => season.id == JSON.parse(prevSelected).id).length > 0 ? JSON.parse(prevSelected) : this.seasons[0];
            this.sportsService.getRacingSeasonsSummary(this.game, this.filter.id).subscribe(this.teamSuccess, this.teamError);
          }
        });
        break;
      }
    }
  }

  filterHockeySeason(season) {
    this.filter = season;
    this.teams = [];
    this.isloading = true;
    this.commonService.setInStorage(this.sport, JSON.stringify(season));
    if (this.sport == 'Hockey')
      this.sportsService.getHockeySeasonInfo(this.filter.id).subscribe(this.teamSuccess, this.teamError);
    else if (this.sport == 'Badminton')
      this.sportsService.getBadmintonSeasonInfo(this.filter.id).subscribe(this.teamSuccess, this.teamError);
    else if (this.sport == 'Racing') {
      this.sportsService.getRacingSeasonsSummary(this.game, this.filter.id).subscribe(this.teamSuccess, this.teamError);
      this.commonService.setInStorage(this.game, JSON.stringify(season));
    }
  }

  teamSuccess = (res) => {
    this.isloading = false;
    switch (this.sport) {
      case 'Cricket': {
        if (res.data) {
          res.data.groups.map((data) => {
            this.teams = data.teams;
          });
        }
        break;
      }
      case 'Kabaddi': {
        if (res.data && res.data.items) {
          this.teams = res.data.items;
        }
        break;
      }
      case 'Soccer': {
        const array = [];
        res.data.map((data) => {
          data.groups.map((gdata) => {
            gdata.competitors.map((cdata) => {
              const isteamexist = array.some((obj) => obj.id == cdata.id);
              if (!isteamexist) {
                array.push(cdata);
              }
            });
          });
        });
        this.teams = array;
        break;
      }
      case 'Basketball': {
        if (res.data && res.data.conferences) {
          this.teams = [];
          res.data.conferences.forEach(conferences => {
            conferences.divisions.forEach(divisions => {
              this.teams.push(divisions);
            });
          });
        }
        break;
      }
      case 'Hockey': {
        if (res.data && res.data.stages) {
          this.teams = [];
          res.data.stages.forEach(stage => {
            stage.groups.forEach(group => {
              this.teams.push(group);
            });
          });
        }
        break;
      }
      case 'Badminton': {
        if (res.data && res.data.stages) {
          this.teams = [];
          res.data.stages.forEach(stage => {
            stage.groups.forEach(group => {
              this.teams.push(group);
            });
          });
        }
        break;
      }
      case 'Racing': {
        if (res.data && res.data.stage && res.data.stage.teams) {
          this.teams = res.data.stage.teams;
        }
        break;
      }
    }
  }

  teamError = (err) => {
    this.isloading = false;
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
