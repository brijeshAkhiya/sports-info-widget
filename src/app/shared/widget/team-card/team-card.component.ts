import { Component, OnInit, Input } from '@angular/core';

import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {

  @Input() teams;
  @Input() sport;
  @Input() tournament;

  constructor(
    public cricketService: CricketService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }

}
