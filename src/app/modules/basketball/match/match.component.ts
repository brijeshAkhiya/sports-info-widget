import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'basketball', aIds: [] } };
  loading: boolean = false;
  matchInfo;

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

    let matchid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'basketball', 'match');
    this.getMatchInfo(matchid);
    this.paramArticle.reqParams.aIds.push(this.activatedroute.snapshot.params.id);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getBasketballSummary(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;

        // if (this.matchInfo.match_info.gamestate === 0) {
        //   this.startLiveUpdateAfterTime();
        // } else if (this.matchInfo.match_info.status === 3)
        //   this.getLiveUpdate(this);

        // this.getVenuedetails();
        // this.initTeam();
        // this.initCommentry();
        // this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }


}
