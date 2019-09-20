import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  seasons: any;
  stats: any;
  isloading = false;
  filter: any;

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }


  ngOnInit() {
    this.getSeasons();
    this.getTournamentStats();
  }

  getTournamentStats() {
    this.isloading = true;
    this.sportsService.getBasketballstats(2018, 'REG').subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.stats = res.data.categories[0].ranks;
      }
    },
      error => this.isloading = false);
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        this.seasons = res.data.seasons;
        console.log(this.seasons);
        this.filter.year = this.seasons[0].year;
        this.filter.type = this.seasons[0].type.code;
      }
    });
  }

  filterData(params) {

    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    console.log(this.filter);

  }

}
