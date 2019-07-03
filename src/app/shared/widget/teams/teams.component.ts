import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CommonService } from '@providers/common-service';
import { CricketService } from '@providers/cricket-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  @Input() teams;

  constructor(
    public commonService: CommonService,
    public cricketService: CricketService
  ) { }

  ngOnInit() {
  }
}
