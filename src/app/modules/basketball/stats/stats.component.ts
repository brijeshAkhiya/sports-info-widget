import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: any;
  isloading = false;

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }


  ngOnInit() {
    this.getTournamentStats();
  }

  getTournamentStats() {
    this.isloading = true;
    this.sportsService.getBasketballstats(2018, 'REG').subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.stats = res.data.categories[0].ranks
        console.log(this.stats);
      }
    },
      error => this.isloading = false);
  }

}
