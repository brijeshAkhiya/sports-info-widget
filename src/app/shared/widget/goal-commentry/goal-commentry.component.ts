import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-goal-commentry',
  templateUrl: './goal-commentry.component.html',
  styleUrls: ['./goal-commentry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GoalCommentryComponent implements OnInit {

  @Input() commentry;
  @Input() sport;
  @Input() team;
  constructor() { }

  ngOnInit() {
  }

}
