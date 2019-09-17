import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  sport;
  tournamentid;
  teams;
  isloading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    const data: any = this.activatedRoute.data;
    const routeParams = this.activatedRoute.snapshot.params;
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
    }
  }

  teamError = (err) => {
    console.log(err);
    this.isloading = false;
  }

}
