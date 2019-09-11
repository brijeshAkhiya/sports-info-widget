import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '@providers/common-service';

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
    public commonService: CommonService
  ) { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.sport);

    if (this.sport === 'Soccer') {
      if (typeof this.tournament === 'undefined' || this.tournament === '')
        this.listtype = 'datelist';
    }
  }
  replace(str) {
    return str.replace(/_/g, ' ');
  }

}
