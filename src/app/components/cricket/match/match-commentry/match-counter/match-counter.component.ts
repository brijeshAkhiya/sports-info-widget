import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-counter',
  templateUrl: './match-counter.component.html',
  styleUrls: ['./match-counter.component.css']
})
export class MatchCounterComponent implements OnInit {

  @Input() scheduled;

  hours: number;
  minutes: number;
  seconds: number;
  constructor() { }

  ngOnInit() {

    let date = this.scheduled;
    console.log()
    setInterval(() => {
      let enddate = new Date(date).getTime();
      let now = new Date().getTime();
      let time = enddate - now;
      if (time >= 0) {
        this.hours = Math.floor(
          (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.minutes = Math.floor(
          (time % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.seconds = Math.floor((time % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

}
