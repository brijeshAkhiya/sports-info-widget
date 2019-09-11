import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';


@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineupComponent implements OnInit {

  @Input() sport;
  @Input() lineup;
  @Input() team;
  objectKeys = Object.keys;

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService
  ) {
  }

  ngOnInit() { }

}
