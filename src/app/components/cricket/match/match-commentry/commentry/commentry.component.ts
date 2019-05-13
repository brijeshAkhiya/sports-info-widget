import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commentry',
  templateUrl: './commentry.component.html',
  styleUrls: ['./commentry.component.css']
})
export class CommentryComponent implements OnInit {

  @Input() commentaries: any;
  @Input() index: any;
  constructor() { }

  ngOnInit() {
    
  }

}
