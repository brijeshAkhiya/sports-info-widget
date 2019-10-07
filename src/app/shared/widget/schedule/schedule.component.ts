import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {

  @Input() data;
  @Input() type;
  @Input() sport;
  @Input() tournament;
  @Input() list_type;
  listtype = 'simple';
  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit() {

    if (this.list_type) {
      this.listtype = this.list_type;
      return false;
    }

    if (this.sport === 'Soccer') {
      if (typeof this.tournament === 'undefined' || this.tournament === '')
        this.listtype = 'datelist';
    } else if (this.sport === 'Basketball') {
      this.listtype = 'datelist';
    } else if (this.sport === 'Hockey') {
      if (typeof this.tournament === 'undefined' || this.tournament === '')
        this.listtype = 'datelist';
    }
  }
  replace(str) {
    return str.replace(/_/g, ' ');
  }

}
