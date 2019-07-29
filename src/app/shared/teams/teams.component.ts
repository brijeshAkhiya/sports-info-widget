import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
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
    public cricketService: CricketService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    let data: any = this.activatedRoute.data
    let routeParams = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot);
    console.log(routeParams);
    console.log(data);
    this.sport = data.value.sport;

    this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'cricket', 'tournament');
    console.log(this.sport);
    
    if (this.sport == 'cricket') {
      this.getTournamentTeams(this.tournamentid);
    }
    else if (this.sport == 'kabaddi') {
      this.getKabaddiTeams();
    }
    this.gettopscorer('totalpoint');
  }

  //get kabaddi top scorers

  gettopscorer(type){
    this.isloading = true;
    this.sportsService.getkabaddistats(type).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.scorerdata = res.data
      }
    },
    error => this.isloading = false)
  }


  //Cricket - Get tournament teams
  getTournamentTeams(id) {
    this.sportsService.gettournamentteams(id).subscribe((res: any) => {
      if (res.data) {
        res.data.groups.map((data) => {
          this.teams = data.teams
        })
      }
    })
  }

  //Kabaddi - Get teams
  getKabaddiTeams() {
    this.sportsService.getkabadditeams().subscribe((res: any) => {
      console.log(res.data.items);
      
      if (res.data && res.data.items) {
        this.teams = res.data.items;
      }      
    })
  }
}
