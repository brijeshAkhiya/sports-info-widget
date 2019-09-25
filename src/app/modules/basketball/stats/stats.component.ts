import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';

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
  constructor(
    private sportsService: SportsService
  ) { }


  ngOnInit() {
    this.getSeasons();

  }

  getTournamentStats() {
    this.isloading = true;
    this.sportsService.getBasketballstats(this.filter.year, this.filter.type).subscribe((res: any) => {
      if (res) {
        this.seasons.names = [];
        this.isloading = false;
        if (res.data.categories.length > 0) {
          let stats = res.data.categories.filter((category) => category.name == this.filter.names && category.type == 'average');
          if (stats.length > 0)
            this.stats = stats[0].ranks;
        }
        let name = [];
        res.data.categories.forEach(element => {
          /* // get unique seasons.type.code */
          name.push(element.name);
        });
        this.seasons.names.push(name.filter(this.onlyUnique));
      }
    },
      error => this.isloading = false);
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        if (res.data.seasons) {
          this.filter.year = res.data.seasons[res.data.seasons.length - 1].year;
          this.filter.type = res.data.seasons[res.data.seasons.length - 1].type.code;
          this.filter.names = 'points';
        }

        let years = [];
        let typecode = [];
        res.data.seasons.forEach(element => {
          /* get unique seasons.type.code */
          typecode.push(element.type.code);
          /* get unique seasons.year */
          years.push(element.year);
        });
        this.seasons.year.push(years.filter(this.onlyUnique));
        this.seasons.type.push(typecode.filter(this.onlyUnique));
        this.getTournamentStats();
      }
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  filterData(params) {
    if (params.names)
      this.filter.names = params.names;
    if (params.year)
      this.filter.year = params.year;
    if (params.type)
      this.filter.type = params.type;
    if (params.type)
      this.filter.category = params.category;
    this.getTournamentStats();

  }

}
