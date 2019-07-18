import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goal-commentry',
  templateUrl: './goal-commentry.component.html',
  styleUrls: ['./goal-commentry.component.css']
})
export class GoalCommentryComponent implements OnInit {

  @Input() commentry;
  constructor() { }

  ngOnInit() {
  }

}
