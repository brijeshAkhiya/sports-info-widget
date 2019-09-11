import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { CommonService } from '@providers/common-service';

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
    public commonService: CommonService,
  ) {

  }

  ngOnInit() {
    console.log(this.matchStats);
  }

}
