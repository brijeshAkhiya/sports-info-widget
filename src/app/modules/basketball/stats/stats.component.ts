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
  filter: any = { 'category': 'points' };

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }


  ngOnInit() {
    this.getSeasons();
  }

  getTournamentStats() {
    this.isloading = true;
    this.sportsService.getBasketballstats(this.filter.year, this.filter.type).subscribe((res: any) => {
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
        if (this.seasons) {
          this.filter.year = this.seasons[this.seasons.length - 1].year;
          this.filter.type = this.seasons[this.seasons.length - 1].type.code;
        }
        this.getTournamentStats();
      }
    });
  }

  filterData(params) {

    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    if (params.type)
      this.filter.category = params.category;
    this.getTournamentStats();

  }

}
