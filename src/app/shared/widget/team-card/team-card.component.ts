import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamCardComponent implements OnInit {

  @Input() teams;
  @Input() sport;
  @Input() tournament;
  @Input() type;

  constructor(
    public cricketService: CricketService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    if(this.sport == 'soccer' && this.type == undefined){
      this.type = 'teams'
    }
  }

}
