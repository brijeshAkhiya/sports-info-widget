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
          conference.divisions.forEach((division, divIndex) => {
            this.standings.divisions.push(division);
            division.teams.forEach(team => {
              /** Team Required Parameters */
              team.gb_league = team.games_behind.league;
              team.gb_conference = team.games_behind.conference;
              let team_home = team.records.filter(record => record.record_type == 'home')[0];
              if (typeof team_home != 'undefined') team.home = team_home.wins + '-' + team_home.losses;
              team.away = (team.wins - team_home.wins) + '-' + (team.losses - team_home.losses);
              let team_division = team.records.filter(record => record.record_type == 'division')[0];
              if (typeof team_division != 'undefined') team.division = team_division.wins + '-' + team_division.losses;
              let team_conf = team.records.filter(record => record.record_type == 'conference')[0];
              if (typeof team_conf != 'undefined') team.conference = team_conf.wins + '-' + team_conf.losses;
              team.streak = ((team.streak.kind == 'win') ? 'W' : 'L') + team.streak.length;
              let team_less10 = team.records.filter(record => record.record_type == 'last_10')[0];
              if (typeof team_less10 != 'undefined') team.less10 = team_conf.wins + '-' + team_conf.losses;

              console.log(index, divIndex);

              if (!this.standings.conferences[index].teams)
                this.standings.conferences[index].teams = [];
              this.standings.conferences[index].teams.push(team);

              // if (!this.standings.divisions[index][divIndex])
              //   this.standings.divisions[index][divIndex].teams = [];
              // this.standings.divisions[index][divIndex].teams.push(team);

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