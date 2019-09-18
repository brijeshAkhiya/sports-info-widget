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
    this.getTournamentStats('totalpoint');
  }

  getTournamentStats(params) {
    this.isloading = true;
    this.sportsService.getkabaddistats(params).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.stats = res.data;
        console.log(this.stats);
      }
    },
      error => this.isloading = false);
  }

}
