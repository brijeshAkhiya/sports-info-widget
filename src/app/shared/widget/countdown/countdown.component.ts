import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() scheduled;
  matchstartedcase: boolean = false;
  remainingTime: any;
  interval;

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.scheduled =this.scheduled.replace(/\s/g, "T");
    let starttime = new Date(this.scheduled).getTime();
    let currenttime = new Date().getTime();
    if (currenttime > starttime) {
      this.matchstartedcase = true;
    }
    else {
      this.interval = setInterval(() => {
        this.remainingTime = this.commonService.getRemainigTimeofMatch(this.scheduled)
        if (this.remainingTime.days.toString().length == 1) {
          this.remainingTime.days = "0" + this.remainingTime.days
        }
        if (this.remainingTime.hours != 0 && this.remainingTime.hours.toString().length == 1) {
          this.remainingTime.hours = "0" + this.remainingTime.hours
        }
        if (this.remainingTime.minutes != 0 && this.remainingTime.minutes.toString().length == 1) {
          this.remainingTime.minutes = "0" + this.remainingTime.minutes
        }
        if (this.remainingTime.seconds.toString().length == 1) {
          this.remainingTime.seconds = "0" + this.remainingTime.seconds
        }
        if (this.remainingTime.days == 0 && this.remainingTime.hours == 0 && this.remainingTime.minutes == 0 && this.remainingTime.seconds == 0)
          this.clear();
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.clear();
  }

  clear() {
    clearInterval(this.interval);
  }
}

