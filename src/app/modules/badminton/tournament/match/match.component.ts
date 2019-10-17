import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Badminton', aIds: [] } };
  loading = false;
  matchInfo;
  commentry: any = { loading: false, data: {} };
  interval;
  timeout;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    let matchid = this.activatedroute.snapshot.params.id;
    this.paramArticle.reqParams.aIds.push(this.commonService.getIds(matchid, 'badminton', 'match'));
    this.getMatchInfo(this.commonService.getIds(matchid, 'badminton', 'match'));
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getBadmintonMatchTimeline(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

}
