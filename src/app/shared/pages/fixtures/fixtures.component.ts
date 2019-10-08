import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from 'ngx-owl-carousel-o';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

import * as fromRoot from '@app/app-reducer';
import * as Kabaddi from '@store/kabaddi/kabaddi.actions';
import * as Cricket from '@store/cricket/cricket.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FixturesComponent implements OnInit {


  @ViewChild('gallery') public gallery: CarouselComponent;

  params;
  // @Input() sport: any;
  @Input() title: any;
  paramsFixtures = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid: '' };
  paramsResults = { reqParams: { 'status': 2, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [], tournamentid: '' };
  tournamentid: any;
  activeTab: any = 'fixtures';

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    public commonService: CommonService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    const routeData: any = this.activatedroute;
    this.params = routeData.data.value;
    console.log(this.params.sport);
    if (this.params.sport == 'Cricket') {
      /* Tournaments Fixtures */
      this.activeTab = routeData.params.value.type;
      if (typeof this.activatedroute.parent.snapshot.params.id != 'undefined') {
        this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'cricket', 'tournament');
        this.getCricketMatchFixtures(this.tournamentid);
        this.getCricketMatchResults(this.tournamentid);
      } else {
        /* View all - recent fixtures */
        this.store.dispatch(new Cricket.LoadCricketFixtures());
        this.store.dispatch(new Cricket.LoadCricketResults());
        this.store.select('Cricket').subscribe((data: any) => {
          if (data.fixtures.length > 0)
            this.paramsFixtures.data = this.commonService.sortArr(data.fixtures, 'Do MMMM YYYY', 'scheduled', 'asc');
          if (data.results.length > 0)
            this.paramsResults.data = this.commonService.sortArr(data.results, 'Do MMMM YYYY', 'scheduled', 'desc');
        });
      }
    } else if (this.params.sport == 'Kabaddi') {
      this.activeTab = routeData.url.value[0].path;
      this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
      this.store.dispatch(new Kabaddi.LoadKabaddiResults());
      this.store.select('Kabaddi').subscribe((data: any) => {
        if (Object.entries(data.fixtures).length > 0 && data.fixtures.items.length > 0) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(data.fixtures.items, 'Do MMMM YYYY', 'datestart', 'asc'));
        }
        this.paramsFixtures.loadmore = this.checkKabaddiDataLoadMore(data.fixtures, this.paramsFixtures);

        if (Object.entries(data.results).length > 0 && data.results.items.length > 0) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(data.results.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        this.paramsResults.loadmore = this.checkKabaddiDataLoadMore(data.results, this.paramsResults);
      });

    } else if (this.params.sport == 'Soccer') {
      // Tournament Fixtures
      if (typeof this.activatedroute.parent.snapshot.params.id != 'undefined') {
        this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'soccer', 'tournament');
        this.getSoccerTournamentData(this.tournamentid);
      }
    } else if (this.params.sport == 'Hockey') {
      // Tournament Fixtures
      if (typeof this.activatedroute.parent.snapshot.params.id != 'undefined') {
        this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'hockey', 'season');
        this.getHockeyTournamentData(this.tournamentid);
      }
    }
  }

  getHockeyTournamentData(id) {
    this.paramsFixtures.loading = true;
    this.paramsResults.loading = true;
    this.sportsService
      .getHockeySeasonSummary('sr:season:71218')
      .subscribe((res: any) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
        if (res.data.summaries && res.data.summaries.length > 0) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(
            this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started'),
              'Do MMMM YYYY', 'start_time', 'asc')
          );
          this.paramsResults.data = this.paramsResults.data.concat(
            this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'closed'),
              'Do MMMM YYYY', 'start_time', 'desc')
          );
        }
      }, (error) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
      });

  }

  getSoccerTournamentData(id) {
    this.paramsFixtures.loading = true;
    this.paramsResults.loading = true;
    this.sportsService
      .getSoccerTournamentMatches(id)
      .subscribe((res: any) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
        if (res.data.summaries && res.data.summaries.length > 0) {
          this.paramsFixtures.data = this.paramsFixtures.data.concat(
            this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'not_started'),
              'Do MMMM YYYY', 'start_time', 'asc')
          );
          this.paramsResults.data = this.paramsResults.data.concat(
            this.sortArr(res.data.summaries.filter((match) => match.sport_event_status.status == 'closed'),
              'Do MMMM YYYY', 'start_time', 'desc')
          );
        }
      }, (error) => {
        this.paramsFixtures.loading = false;
        this.paramsResults.loading = false;
      });

  }

  sortArr(data, format, date_param, sort_type) {
    data.sort((a, b) => {
      if (sort_type === 'asc') {
        return new Date(a['sport_event'][date_param]) < new Date(b['sport_event'][date_param]) ? -1 : new Date(a['sport_event'][date_param]) > new Date(b['sport_event'][date_param]) ? 1 : 0;
      } else {
        return new Date(a['sport_event'][date_param]) > new Date(b['sport_event'][date_param]) ? -1 : new Date(a['sport_event'][date_param]) < new Date(b['sport_event'][date_param]) ? 1 : 0;
      }
    });
    const dateObj = {};
    data.map((obj) => {
      const mdate = moment(obj['sport_event'][date_param]).format(format);
      if (!dateObj[mdate]) dateObj[mdate] = [];
      dateObj[mdate].push(obj);
    });
    return Object.keys(dateObj).map(key => ({ key, data: dateObj[key] }));
  }

  checkKabaddiDataLoadMore(arr, params) {
    if (Object.entries(arr).length > 0 && arr.items.length > 0 && arr.total_pages > params.reqParams.page)
      return true;
    return false;
  }

  getKabaddiFixtures() {
    this.paramsFixtures.loading = true;
    this.sportsService.getKabaddiMatchList(this.paramsFixtures.reqParams.status, this.paramsFixtures.reqParams.per_page, this.paramsFixtures.reqParams.page).subscribe((res: any) => {
      this.paramsFixtures.loading = false;
      if (res.data && res.data.items) {
        this.paramsFixtures.data = this.paramsFixtures.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'asc'));
      }
      this.paramsFixtures.loadmore = this.checkKabaddiDataLoadMore(res.data, this.paramsFixtures);
    }, (error) => {
      this.paramsFixtures.loading = false;
      this.paramsFixtures.loadmore = false;
    });
  }

  getKabaddiResults() {
    this.paramsResults.loading = true;
    this.sportsService
      .getKabaddiMatchList(this.paramsResults.reqParams.status, this.paramsResults.reqParams.per_page, this.paramsResults.reqParams.page)
      .subscribe((res: any) => {
        this.paramsResults.loading = false;
        if (res.data && res.data.items) {
          this.paramsResults.data = this.paramsResults.data.concat(this.commonService.sortArr(res.data.items, 'Do MMMM YYYY', 'datestart', 'desc'));
        }
        this.paramsResults.loadmore = this.checkKabaddiDataLoadMore(res.data, this.paramsResults);
      }, (error) => {
        this.paramsResults.loading = false;
        this.paramsResults.loadmore = false;
      });
  }

  loadmore(type) {
    if (type == 'fixture') {
      this.paramsFixtures.reqParams.page += 1;
      this.getKabaddiFixtures();
    } else if (type == 'result') {
      this.paramsResults.reqParams.page += 1;
      this.getKabaddiResults();
    }
  }

  /*
    loadKabaddi(type) {
      if (type == 'fixture') {
        if (this.paramsFixtures.data && this.paramsFixtures.data.length > 0)
          return false;
        this.getKabaddiFixtures();
      } else if (type == 'result') {
        if (this.paramsResults.data && this.paramsResults.data.length > 0)
          return false;
        this.getKabaddiResults();
      }
    } */


  /* get 3 days matches fixtures - HOME */
  getCricketMatchFixtures(id) {
    this.paramsFixtures.loading = true;
    this.sportsService
      .gettournamentfixtures(id)
      .subscribe((res: any) => {
        this.paramsFixtures.loading = false;
        if (res.data) {
          this.paramsFixtures.data = this.commonService.initCompetitorScore(res.data);
          this.paramsFixtures.data = this.commonService.sortArr(this.paramsFixtures.data, 'Do MMMM YYYY', 'scheduled', 'asc');
        }
      }, (error) => {
        this.paramsFixtures.loading = false;
        this.paramsFixtures.loadmore = false;
      });
  }

  /* get 3 days results -HOME */
  getCricketMatchResults(id) {
    this.paramsResults.loading = true;
    this.sportsService
      .gettournamentresults(id)
      .subscribe((res: any) => {
        this.paramsResults.loading = false;
        if (res.data) {
          this.paramsResults.data = this.commonService.initCompetitorScore(res.data);
          this.paramsResults.data = this.commonService.sortArr(this.paramsResults.data, 'Do MMMM YYYY', 'scheduled', 'desc');
        }
      }, (error) => {
        this.paramsResults.loading = false;
        this.paramsResults.loadmore = false;
      });
  }

  // Soccer Fixtures Date Slider
  customOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight: true,
    lazyLoad: true,
    navSpeed: 150,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7,
        slideBy: 7
      },
      612: {
        items: 7,
        slideBy: 7
      }
    },
    nav: true
  };

}
