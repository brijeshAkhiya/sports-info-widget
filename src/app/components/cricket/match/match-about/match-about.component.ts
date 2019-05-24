import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-about',
  templateUrl: './match-about.component.html',
  styleUrls: ['./match-about.component.css']
})
export class MatchAboutComponent implements OnInit {

  @Input() data: any;
  @Input() teams: any;
  teamsresultsscore;

  constructor() { }

  ngOnInit() {  
  if(this.data['sport_event_status']['status'] == 'closed'){
    let compititors = this.data['sport_event']['competitors']
    let scores = this.data['sport_event_status']['period_scores']
    //make obj for team results display
    let obj = {}
    compititors.map((sComp)=>{
      obj[sComp.qualifier] = sComp
    })  
    scores.map((sScore)=>{
      if(sScore.home_score){
        if (!obj["home"].period_scores) {
          obj["home"].period_scores = [];
        }
        obj["home"].period_scores.push(sScore);
      } else {
        if (!obj["away"].period_scores) {
          obj["away"].period_scores = [];
        }
        obj["away"].period_scores.push(sScore);
      }
    })

    this.teamsresultsscore = obj
    console.log(this.teamsresultsscore);
    
  }
 }
}

