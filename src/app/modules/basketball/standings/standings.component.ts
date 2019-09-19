import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  standings: any = { conferences: [], divisions: [], teams: [] };
  isloading = false;


  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }


  ngOnInit() {
    this.getTournamentStandings();
  }

  getTournamentStandings() {
    this.isloading = true;
    this.sportsService.getBasketballstandings(2018, 'REG').subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        res.data.conferences.forEach((conference, index) => {
          this.standings.conferences.push(conference);
          conference.divisions.forEach(division => {
            this.standings.divisions.push(division);
            division.teams.forEach(team => {
              team.gb_league = team.games_behind.league;
              team.gb_conference = team.games_behind.conference;
              let team_home = team.records.filter(record => record.record_type == 'home')[0];
              team.home = team_home.wins + '-' + team_home.losses;
              // let team_away = team.records.filter(record => record.record_type == 'away')[0];
              // team.away = team_away.wins + '-' + team_away.losses;
              let team_division = team.records.filter(record => record.record_type == 'division')[0];
              team.division = team_division.wins + '-' + team_division.losses;

              if (!this.standings.conferences[index].teams)
                this.standings.conferences[index].teams = [];
              this.standings.conferences[index].teams.push(team);

              this.standings.teams.push(team);
            });
          });
        });
        console.log(this.standings);
      }
    },
      error => this.isloading = false);
  }

}