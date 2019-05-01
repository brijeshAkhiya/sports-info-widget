import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cricket-tour-menu',
  templateUrl: './cricket-tour-menu.component.html',
  styleUrls: ['./cricket-tour-menu.component.css']
})
export class CricketTourMenuComponent implements OnInit {
  @Input() dataToChild: any;
  constructor() { }

  ngOnInit() {
 
   
    
  }

}
