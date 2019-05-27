import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-commentry',
  templateUrl: './match-commentry.component.html',
  styleUrls: ['./match-commentry.component.css']
})
export class MatchCommentryComponent implements OnInit {

  @Input() data: any;
  @Input() commentry: any;
  @Input() oversummery: any;
  @Input() ballerList: any;
  showCommetry;
  ballers: any;
  constructor() {}

  ngOnInit(){
  }
}