import { Component, OnInit, Input } from '@angular/core';

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
  @Input() type;

  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit() {
    if (this.sport == 'soccer' && this.type == undefined) {
      this.type = 'teams'
    }
  }

}
