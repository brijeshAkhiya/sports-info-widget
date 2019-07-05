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

  constructor(
    private activatedRoute: ActivatedRoute,
    private sportsService: SportsService,
    public cricketService: CricketService,
    public commonService: CommonService
    ) {  }

  ngOnInit() {
   
    let data:any = this.activatedRoute.data;
    this.sport = data.value.sport;
    this.routeParams = this.activatedRoute.snapshot.params
    this.paramArticle = { reqParams : { nStart: 0, nLimit: 10, aIds: [ this.routeParams.teamid] }, sport : this.sport }
    if(this.routeParams.tournamentid)
      this.getTournamentTeamProfile( this.routeParams.teamid,  this.routeParams.tournamentid)
    else
      this.getTeamProfile( this.routeParams.teamid);
  }

  getTeamProfile(teamid) {
    this.loading = true;
    if (teamid) {
      this.sportsService.getteamprofileview(teamid).subscribe((res:any) => {
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
      this.sportsService.getteamprofile(tournamentid, teamid).subscribe((res:any) => {
        this.loading = false;
        if (res.data) 
          this.teamProfile = res.data
      }, (error) => {
        this.loading = false;
      })
    }
  }


  getTeamResults() {
    if(this.matchresults && this.matchresults.length > 0 )
      return false;

    this.loadingResult = true;
    this.sportsService
      .getteamresults( this.routeParams.teamid)
      .subscribe((res: any) => {
        this.loadingResult = false;
        if (res.data){
           this.matchresults =this.cricketService.initCompetitorScore(res.data)
           this.matchresults = this.commonService.sortArr(this.matchresults, 'Do MMMM YYYY', 'scheduled', 'desc');
        }
      }, (error) => {
        this.loadingResult = false;
      });
  }
  
  getTeamFixtures() {
      if(this.matchfixtures && this.matchfixtures.length > 0 )
        return false;

      this.loadingFixture = true;
      this.sportsService.getteamfixtures( this.routeParams.teamid).subscribe((res: any) => {
        this.loadingFixture = false;
        if (res.data.schedule)
          this.matchfixtures = this.commonService.sortArr(res.data.schedule, 'Do MMMM YYYY', 'scheduled', 'asc');
      }, (error) => {
        this.loadingFixture = false;
      });
    }
}
