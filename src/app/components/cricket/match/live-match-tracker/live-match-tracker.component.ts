import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-live-match-tracker',
  templateUrl: './live-match-tracker.component.html',
  styleUrls: ['./live-match-tracker.component.css']
})
export class LiveMatchTrackerComponent implements OnInit {
  @Input() data:any
  matchid: any;
  constructor() { }

  ngOnInit() {
    console.log('tracker',this.data);
    this.matchid = this.data['sport_event']['id'];
    // this.loadScript(this.)
  }

}