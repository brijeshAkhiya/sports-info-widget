import { Component, OnInit, Input } from '@angular/core';

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";


@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  @Input() sport;
  @Input() lineup;
  @Input() team;
  objectKeys = Object.keys
  
  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    ) { 
    }

  ngOnInit() {
    console.log(this.lineup);
    console.log(this.team);
    
  }

}
