import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from "@providers/sports-service";
import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  paramsFixtures = {reqParams : {'status': 1, 'per_page' : 10, 'page': 1}, loading : false, loadmore : false  }
  paramsResults = {reqParams : {'status': 2, 'per_page' : 10, 'page': 1}, loading : false, loadmore : false }
  loadingFixture: boolean = false;
  loadingResult: boolean = false;
  loadMoreFixture: boolean = false;
  loadMoreResult: boolean = false;
  matchfixtures = [];
  matchresults = [];
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
    this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id ,'cricket','tournament');
    this.getFixtures();
  }

  getFixtures() {
    console.log("getFixtures")
    // if(this.matchfixtures && this.matchfixtures.length > 0 )
    //   return false;

    this.paramsFixtures.loading = true;
    this.sportsService.getKabaddiMatchList(this.paramsFixtures.reqParams.status, this.paramsFixtures.reqParams.per_page, this.paramsFixtures.reqParams.page).subscribe((res: any) => {
      
      this.paramsFixtures.loading = false;
      if (res.data && res.data.items)
      this.matchfixtures =  this.matchfixtures.concat(res.data.items);
      this.matchfixtures = this.commonService.sortArr(this.matchfixtures, 'Do MMMM YYYY', 'datestart', 'asc');
        
      if(res.data.total_pages > this.paramsFixtures.reqParams.page)
        this.paramsFixtures.loadmore = true;
      else
        this.paramsFixtures.loadmore = true;
      console.log( this.matchfixtures);
    }, (error) => {
      this.paramsFixtures.loading = false;
    });
  }

  getResults() {
    // if(this.matchresults && this.matchresults.length > 0 )
    //   return false;

    this.paramsResults.loading = true;
    this.sportsService
      .getKabaddiMatchList(this.paramsResults.reqParams.status, this.paramsResults.reqParams.per_page, this.paramsResults.reqParams.page)
      .subscribe((res: any) => {
        this.paramsResults.loading = false;
        if (res.data && res.data.items)
          this.matchresults = this.matchresults.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        if(res.data.total_pages > this.paramsResults.reqParams.page)
          this.paramsResults.loadmore = true;
        else
          this.paramsResults.loadmore = true;
      }, (error) => {
        this.paramsResults.loading = false;
      });
  }
  loadmore(type){
    if(type == 'fixture'){
      this.paramsFixtures.reqParams.page += 1; 
      this.getFixtures();
    }
    else if(type == 'result'){
      this.paramsResults.reqParams.page += 1;
      this.getResults();
    }
  }
}
