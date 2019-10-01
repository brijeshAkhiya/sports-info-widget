import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-match-info-card',
  templateUrl: './match-info-card.component.html',
  styleUrls: ['./match-info-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MatchInfoCardComponent implements OnInit {
  @Input() data;
  @Input() options;
  constructor() { }

  ngOnInit() { }

}
