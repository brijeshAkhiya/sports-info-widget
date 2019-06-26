import { Component, OnInit, Input } from '@angular/core';

import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  @Input() data;
  @Input() options;
  constructor(
    private commonService: CommonService,
    private cricketService: CricketService,
  ) { }

  ngOnInit() {
  }

}
