import { Component, OnInit } from '@angular/core';

import { CommonService } from '@app/shared/providers/common-service';
import { SportsService } from '@app/shared/providers/sports-service';

@Component({
  selector: 'app-tournament-standings',
  templateUrl: './tournament-standings.component.html'
})
export class TournamentStandingsComponent implements OnInit {

  stats: any = { teams: [], players: [], selectedTeams: [], selectedPlayers: [] };
  isloading = false;
  filter: any;
  selectedTab = 'players';

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    this.getTeamStats();
    this.getPlayerStats();
  }

  getTeamStats() {
    this.isloading = true;
    this.sportsService.getTennisTeamRanking().subscribe((res: any) => {
      this.isloading = false;
      if (res.data && res.data.rankings) {
        this.stats.teams = res.data.rankings;
        this.filterSeason(res.data.rankings[0]);
      }
    },
      error => this.isloading = false);
  }

  getPlayerStats() {
    this.isloading = true;
    this.sportsService.getTennisPlayerRanking().subscribe((res: any) => {
      this.isloading = false;
      if (res.data && res.data.rankings) {
        this.stats.players = res.data.rankings;
        this.filterSeason(res.data.rankings[0]);
      }
    },
      error => this.isloading = false);
  }
  filterSeason(season) {
    this.filter = season;
    if (this.stats.teams.length > 0)
      this.stats.selectedTeams = this.stats.teams.filter(team => team.category_id == season.category_id)[0].player_rankings;
    if (this.stats.players.length > 0)
      this.stats.selectedPlayers = this.stats.players.filter(team => team.category_id == season.category_id)[0].player_rankings;
  }

}
