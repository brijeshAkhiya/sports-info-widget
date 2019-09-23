import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

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
  // yearunique:any=[];
  // typeunique: any=[];
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
      if (res) {
        this.seasons.names = [];
        this.isloading = false;
        if (res.data.categories.length > 0) {
          res.data.categories.forEach(element => {
            if (this.filter.names === element.name) {
              this.stats = element.ranks;
            }
          });
        }
        var name = []
        res.data.categories.forEach(element => {
          // get unique seasons.type.code
          name.push(element.name)
        });
        this.seasons.names.push(name.filter(this.onlyUnique))
      }
    },
      error => this.isloading = false);
  }

  getSeasons() {
    this.sportsService.getBasketballseason().subscribe((res: any) => {
      if (res.data && res.data.seasons) {
        // this.seasons = res.data.seasons;
        if (res.data.seasons) {
          this.filter.year = res.data.seasons[res.data.seasons.length - 1].year;
          this.filter.type = res.data.seasons[res.data.seasons.length - 1].type.code;
          this.filter.names = 'points'
        }

        var years = []
        var typecode = []
        res.data.seasons.forEach(element => {
          // get unique seasons.type.code
          typecode.push(element.type.code)
          //get unique seasons.year
          years.push(element.year)
        });
        this.seasons.year.push(years.filter(this.onlyUnique))
        this.seasons.type.push(typecode.filter(this.onlyUnique))
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
