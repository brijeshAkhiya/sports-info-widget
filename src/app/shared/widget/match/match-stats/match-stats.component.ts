import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MatchStatsComponent implements OnInit {

  @Input() matchStats;
  @Input() sport;
  @Input() info;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    ) {
      
     }

  ngOnInit() {
    console.log(this.matchStats);
  }

}
