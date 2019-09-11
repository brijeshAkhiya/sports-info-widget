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
  scorerdata: any;
  isloading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    const data: any = this.activatedRoute.data;
    const routeParams = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot);
    console.log(routeParams);
    console.log(data);
    this.sport = data.value.sport;

    if (this.sport == 'cricket') {
      this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'cricket', 'tournament');
      this.getTournamentTeams(this.tournamentid);
    } else if (this.sport == 'kabaddi') {
      this.getKabaddiTeams();
    } else if (this.sport == 'soccer') {
      this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'soccer', 'tournament');
      console.log('tournament:', this.tournamentid);
      this.getSoccerSeasonTeams(this.tournamentid);
    }
  }

  /* //Cricket - Get tournament teams */
  getTournamentTeams(id) {
    this.sportsService.gettournamentteams(id).subscribe((res: any) => {
      if (res.data) {
        res.data.groups.map((data) => {
          this.teams = data.teams;
        });
      }
    });
  }

  /*  //Kabaddi - Get teams */
  getKabaddiTeams() {
    this.sportsService.getkabadditeams().subscribe((res: any) => {
      console.log(res.data.items);

      if (res.data && res.data.items) {
        this.teams = res.data.items;
      }
    });
  }

  /* //Soccer - get season teams */
  getSoccerSeasonTeams(id) {
    this.sportsService.getsoccerseasonteams(id).subscribe((res: any) => {
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
    });
  }

}
