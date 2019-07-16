import { Component, OnInit, Input } from '@angular/core';
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";


@Component({
  selector: 'app-match-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class MatchAboutComponent implements OnInit {

  @Input() data: any;
  @Input() competitor: any;
  @Input() toss: any;
  @Input() sport: any;

  teamsresultsscore;

  constructor(
    private cricketService: CricketService, private commonService: CommonService
    ) { }

  ngOnInit() {  
    console.log('toss',this.toss);
    console.log(this.data);
    console.log(this.competitor);

    if(this.sport == 'cricket')
      this.initCricket();

 }

 initCricket(){
    
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
