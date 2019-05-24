import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-about',
  templateUrl: './match-about.component.html',
  styleUrls: ['./match-about.component.css']
})
export class MatchAboutComponent implements OnInit {

  @Input() data: any;
  @Input() teams: any;
  @Input() competitor: any;
  

  constructor() { }

  ngOnInit() {    
    console.log(this.competitor)
  }

}
