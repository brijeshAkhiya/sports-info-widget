import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonService } from '@providers/common-service';

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
  game;

  constructor(
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.sport == 'Soccer' && this.type == undefined) {
      this.type = 'teams';
    } else if (this.sport == 'Racing') {
      let params: any = this.activatedRoute.params;
      this.game = params.value.game;
    }

  }

}
