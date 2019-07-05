import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-tournament-fixtures',
  templateUrl: './tournament-fixtures.component.html',
  styleUrls: ['./tournament-fixtures.component.css']
})
export class TournamentFixturesComponent implements OnInit {
 
  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  matchfixtures;
  matchresults;
  tournamentid;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private router: Router,
  ) {
   }

  ngOnInit() {
    this.tournamentid = this.activatedroute.parent.snapshot.params.id 
    this.getMatchFixtures();
  }

  //get 3 days matches fixtures - HOME
  getMatchFixtures() {
    console.log("getMatchFixtures")
    if(this.matchfixtures && this.matchfixtures.length > 0 )
      return false;

    this.loadingFixture = true;
    this.sportsService.gettournamentfixtures(this.tournamentid).subscribe((res: any) => {
      this.loadingFixture = false;
      if (res.data)
        this.matchfixtures = this.commonService.sortArr(res.data, 'Do MMMM YYYY', 'scheduled', 'asc');
        
    }, (error) => {
      this.loadingFixture = false;
    });
  }

  //get 3 days results -HOME
  getMatchResults() {
    if(this.matchresults && this.matchresults.length > 0 )
      return false;

    this.loadingResult = true;
    this.sportsService
      .gettournamentresults(this.tournamentid)
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
}
