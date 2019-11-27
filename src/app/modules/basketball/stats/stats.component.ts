import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  seasons: any = { 'year': [], 'type': [], 'names': [] };
  stats: any;
  isloading = false;
  filter: any = { 'category': 'points' };
  namesdata: any;
  constructor(
    private sportsService: SportsService,
    private commonService: CommonService
  ) { }


  ngOnInit() {
    this.getSeasons();
  }

  getTournamentStats() {
    this.isloading = true;
    this.stats = [];
    this.sportsService.getBasketballstats(this.filter.year, this.filter.type).subscribe((res: any) => {
      if (res) {
        this.isloading = false;
        this.namesdata = res.data.categories;
        this.namesfilter();
        let name = [];
        res.data.categories.forEach(element => {
          /* // get unique seasons.type.code */
          name.push(element.name);
        });
        this.seasons.names = name.filter(this.onlyUnique);
      }
    },
      error => this.isloading = false);
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        if (res.data.seasons) {
          if (!this.commonService.getFromStorage('filteryear') || !this.commonService.getFromStorage('filtertype') || !this.commonService.getFromStorage('filternames')) {
            this.filter.year = res.data.seasons[res.data.seasons.length - 1].year;
            this.commonService.setInStorage('filteryear', this.filter.year);
            this.filter.type = res.data.seasons[res.data.seasons.length - 1].type.code;
            this.commonService.setInStorage('filtertype', this.filter.type);
            this.filter.names = 'points';
            this.commonService.setInStorage('filternames', this.filter.names);
          } else {
            this.filter.year = this.commonService.getFromStorage('filteryear');
            this.filter.type = this.commonService.getFromStorage('filtertype');
            this.filter.names = this.commonService.getFromStorage('filternames');
          }
          // this.filter.names = 'points';
        }

        let years = [];
        let typecode = [];
        res.data.seasons.forEach(element => {
          /* get unique seasons.type.code */
          typecode.push(element.type.code);
          /* get unique seasons.year */
          years.push(element.year);
        });
        this.seasons.year = years.filter(this.onlyUnique);
        this.seasons.type = typecode.filter(this.onlyUnique);
        this.getTournamentStats();
      }
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  namesfilter() {
    if (this.namesdata.length > 0) {
      let stats = this.namesdata.filter((category) => category.name == this.filter.names && category.type == 'average');
      if (stats.length > 0)
        this.stats = stats[0].ranks;
    }
  }
  filterData(params) {
    if (params.names)
      this.filter.names = params.names;
    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    if (!params.names) {
      this.getTournamentStats();
    } else {
      this.namesfilter();
    }
    this.commonService.setInStorage('filteryear', this.filter.year);
    this.commonService.setInStorage('filtertype', this.filter.type);
    this.commonService.setInStorage('filternames', this.filter.names);
  }

}
