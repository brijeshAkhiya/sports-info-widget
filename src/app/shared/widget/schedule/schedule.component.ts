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
  @Input() tournament;
  listtype = 'simple';
  constructor(
    public commonService: CommonService,
    public cricketService: CricketService
  ) { }

  ngOnInit() {
    if (this.sport == 'soccer') {
      if (!(typeof this.tournament != 'undefined' && this.tournament != ''))
        this.listtype = 'datelist'
    }
  }
  replace(str) {
    return str.replace(/_/g, " ")
  }

}
