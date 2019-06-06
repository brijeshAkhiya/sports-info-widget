import { Component, OnInit, Input } from '@angular/core';
import { CricketService } from "@providers/cricket-service";

@Component({
  selector: 'app-match-about',
  templateUrl: './match-about.component.html',
  styleUrls: ['./match-about.component.css']
})
export class MatchAboutComponent implements OnInit {

  @Input() data: any;
  @Input() competitor: any;
  @Input() toss: any;

  teamsresultsscore;

  constructor(
    private cricketService: CricketService
    ) { }

  ngOnInit() {  
    console.log('toss',this.toss);
    
  if(this.data['sport_event_status']['status'] == 'closed'){
    let compititors = this.data['sport_event']['competitors']
    let scores = this.data['sport_event_status']['period_scores']
    
    let obj = {}  
    compititors.map((sComp)=>{
      obj[sComp.qualifier] = sComp
      let temp = (sComp.qualifier == 'home') ?  this.data['sport_event_status']['period_scores'].filter((score)=> {return score.home_score} ) : this.data['sport_event_status']['period_scores'].filter((score)=> {return score.away_score} )
      obj[sComp.qualifier].period_score = temp[0]
    })  
  }
 }
}

