import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-info-card',
  templateUrl: './match-info-card.component.html',
  styleUrls: ['./match-info-card.component.css']
})
export class MatchInfoCardComponent implements OnInit {
  @Input() data;
  @Input() options;
  constructor() { }

  ngOnInit() {
    console.log('infocard', this.options);
    console.log('dataaa', this.data);
  }

}
