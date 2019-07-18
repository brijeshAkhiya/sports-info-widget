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

  constructor(
    private commonService: CommonService,
    private sportsService: SportsService
  ) { }

  ngOnInit() {
    this.getTournamentStats('totalpoint');
  }

  getTournamentStats(params) {
    this.sportsService.getkabaddistats(params).subscribe((res: any) => {
      if (res) {
        this.stats = res.data
      }
    })
  }

}
