import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit {
  numbers = []
  constructor() {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
   }

  ngOnInit() {
  }

}
