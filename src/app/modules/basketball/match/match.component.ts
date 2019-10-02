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

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Basketball', aIds: [] } };
  loading = false;
  matchInfo;
  boxScoreParams = { loading: false };
  commentry = { loading: false, data: [] };
  boxData: any;

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
    this.getMatchInfo(matchid);
    this.paramArticle.reqParams.aIds.push(matchid);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getBasketballMatchSummary(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;
        this.matchInfo.venuedetails = this.matchInfo.venue;
        this.sportsService.getReverseGeo(this.matchInfo.venuedetails.name + ',' + this.matchInfo.venuedetails.city + ',' + this.matchInfo.venuedetails.country).subscribe((geo: any) => {
          this.matchInfo.venuedetails.lat = geo.results[0].geometry.location.lat;
          this.matchInfo.venuedetails.lng = geo.results[0].geometry.location.lng;
        });
        this.getMatchBoxScore(id);
        if (this.matchInfo.status == 'closed')
          this.getMatchCommentry(id);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchCommentry(id) {
    this.commentry.loading = true;
    this.sportsService.getBasketballMatchPlayByPlay(id).subscribe((res: any) => {
      if (res.data) {
        this.commentry.data = res.data;
        this.matchInfo.periods = res.data.periods;
      }
      this.commentry.loading = false;
    }, (error) => {
      this.commentry.loading = false;
    });
  }


  getMatchBoxScore(id) {
    // if (this.boxScoreParams.data.length > 0)
    //   return false;

    this.boxScoreParams.loading = true;
    this.sportsService.getBasketballMatchBoxScore(id).subscribe((res: any) => {
      this.boxScoreParams.loading = false;
      if (res.data) {
        this.boxData = res.data;
        let that = this;
        if (res.data.home.leaders) {
          Object.keys(res.data.home.leaders).forEach(function (key) {
            res.data.home.leaders[key].forEach(leader => {
              if (!that.boxData.home.squads) that.boxData.home.squads = [];
              leader.type = key;
              that.boxData.home.squads.push(leader);
            });
          });
        }
        if (res.data.away.leaders) {
          Object.keys(res.data.away.leaders).forEach(function (key) {
            res.data.away.leaders[key].forEach(leader => {
              if (!that.boxData.away.squads) that.boxData.away.squads = [];
              leader.type = key;
              that.boxData.away.squads.push(leader);
            });
          });
        }
      }
    }, (error) => {
      this.boxScoreParams.loading = false;
    });
  }
}
