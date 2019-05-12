import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-commentry',
  templateUrl: './match-commentry.component.html',
  styleUrls: ['./match-commentry.component.css']
})
export class MatchCommentryComponent implements OnInit {

  @Input() timeline: any;

  data: any;
  firstInning = [];
  secondInning = [];
  allCommentry = [];

  constructor() { } 

  ngOnInit() {
    this.data = this.timeline.reverse();


    this.data.forEach(comment => {
        let temp = [];
        let prev ;
        console.log(typeof comment.over_number != "undefined", comment.over_number , prev)
        if(typeof comment.over_number != "undefined" && comment.over_number != prev){
          prev = comment.over_number;
          temp.push(comment);
          this.allCommentry.push(temp);
        }
        else{
          temp.push(comment);
        }
        console.log(temp)
    });

    for (let ball = 20; ball >= 1; ball--) {
      let temp = this.data.filter(commentry => {return commentry.over_number == ball && commentry.inning == 1; }) 
      if(temp.length > 0)
        this.firstInning.push(temp);
    }

    for (let ball = 20; ball >= 1; ball--) {
      let temp = this.data.filter(commentry => {return commentry.over_number == ball && commentry.inning == 2; }) 
      if(temp.length > 0)
        this.secondInning.push(temp);
    }
    console.log(this.secondInning);
    
  

  }

}
