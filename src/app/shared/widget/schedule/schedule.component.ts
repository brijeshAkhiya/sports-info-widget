import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from "@providers/common-service";
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() data;
  @Input() type;
  @Input() sport;

  constructor(
    public commonService: CommonService,
    public cricketService: CricketService
  ) { }

  ngOnInit() {
  }

}
