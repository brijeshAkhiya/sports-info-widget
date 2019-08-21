import { Component, OnInit, Input } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {

  @Input() matchStats;
  @Input() sport;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    ) { }

  ngOnInit() {
  }

}
