import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-about',
  templateUrl: './match-about.component.html',
  styleUrls: ['./match-about.component.css']
})
export class MatchAboutComponent implements OnInit {

  @Input() matchdata;
  constructor() { }

  ngOnInit() {
    console.log(this.matchdata);
    
  }

}
