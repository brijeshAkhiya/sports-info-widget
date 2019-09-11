import { Component, OnInit, Input } from '@angular/core';

import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {

  @Input() matchStats;
  @Input() sport;
  @Input() info;

  constructor(
    public commonService: CommonService,
  ) {

  }

  ngOnInit() {
    console.log(this.matchStats);
  }

}
