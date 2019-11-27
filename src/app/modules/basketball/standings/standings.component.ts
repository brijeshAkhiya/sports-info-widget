import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  seasons: any = { 'year': [], 'type': [] };
  filter: any = {};
  standings: any = { conferences: [], divisions: [], teams: [] };
  isloading = false;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getSeasons();
  }

  getTournamentStandings(year, type) {
    this.isloading = true;
    this.sportsService.getBasketballstandings(year, type).subscribe((res: any) => {
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

              if (!this.standings.conferences[index].teams)
                this.standings.conferences[index].teams = [];
              this.standings.conferences[index].teams.push(team);

              this.standings.teams.push(team);
            });
          });
        });
      }
    },
      error => this.isloading = false);
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        if (res.data.seasons) {
          if (!this.commonService.getFromStorage('filteryear')) {
            this.filter.year = res.data.seasons[res.data.seasons.length - 1].year;
            this.commonService.setInStorage('filteryear', this.filter.year);
            this.filter.type = res.data.seasons[res.data.seasons.length - 1].type.code;
            this.commonService.setInStorage('filtertype', this.filter.type);
          } else {
            this.filter.year = this.commonService.getFromStorage('filteryear');
            this.filter.type = this.commonService.getFromStorage('filtertype');
            this.getTournamentStandings(this.filter.year, this.filter.type);
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
    this.standings.conferences = [];
    this.standings.teams = [];
    this.standings.divisions = [];
    this.getTournamentStandings(this.filter.year, this.filter.type);
    this.commonService.setInStorage('filteryear', this.filter.year);
    this.commonService.setInStorage('filtertype', this.filter.type);
  }
}
