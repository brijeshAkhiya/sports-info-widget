import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-commentry',
  templateUrl: './match-commentry.component.html',
  styleUrls: ['./match-commentry.component.css']
})
export class MatchCommentryComponent implements OnInit {

  @Input() data: any;

  timeline: any;
  statistics: any;
  firstInning = [];
  firstInningCommentry = [];
  secondInning = [];
  secondInningCommentry = [];

  constructor() { }

  ngOnInit() {
    
    if(this.data.sport_event_status.status == 'closed')
      this.getCommentry()

  }

  getCommentry(){

    this.timeline = this.data.timeline;
    this.statistics = this.data.statistics;
    // let indexOfMatchStarted = this.timeline.findIndex((commentry) => commentry.type == 'match_started');
    // this.beforeStartCommentry = this.timeline.splice(0, indexOfMatchStarted);

    let indexOfSecondInning = this.timeline.findIndex((commentry) => commentry.inning == 2);
    
    this.firstInning = this.timeline.slice(0, indexOfSecondInning);
    let statsFirstIndex = this.statistics.innings.findIndex((stats) => stats.number == 1);
    this.firstInningCommentry = this.createCommentry(this.firstInning, statsFirstIndex);

    this.secondInning = this.timeline.slice(indexOfSecondInning);
    let statsSecondIndex = this.statistics.innings.findIndex((stats) => stats.number == 2);
    this.secondInningCommentry = this.createCommentry(this.secondInning, statsSecondIndex);

  }

  createCommentry(inning, statsIndex) {

    let currentInningStats = this.statistics.innings[statsIndex];
    let InningCommentry = []
    let firstIndex = 0;
    let lastIndex;
    
    for (let i = 1; i <= currentInningStats.overs_completed + 1; i++) {
      lastIndex = inning.findIndex((ele) => ele.over_number == i + 1);
      let currentOverData = inning.slice(firstIndex, lastIndex)
      firstIndex = lastIndex;
      let currentOverStats = currentInningStats.overs.filter(over => { return over.number == i });

      if(currentOverData.length > 0){
        InningCommentry.push(
          {'data' : currentOverData.reverse(), 
          'stats' : { 
              'over_number' : typeof currentOverStats[0].number != 'undefined' ? currentOverStats[0].number : 0,
            'runs' : typeof currentOverStats[0].runs != 'undefined' ? currentOverStats[0].runs : 0,
            'wickets' :typeof currentOverStats[0].wickets != 'undefined' ? currentOverStats[0].wickets : 0
            }
          });
      }
    }
    return InningCommentry.reverse();
  }
}





/*** Start Second Logic for commentry and over count */
    // let overCommentry = [];
    // let overWicket = 0;
    // let overRun = 0;
    // this.withoutCloseofPlayData = data.filter(commentry => {return commentry.type != 'close_of_play' });
    // this.withoutCloseofPlayData = this.withoutCloseofPlayData.filter(commentry => {return commentry.type != 'match_ended' });
    // this.withoutCloseofPlayData.forEach(comment => {

    //     if(comment.type == 'ball'){
    //       overRun += comment.batting_params.runs_scored;

    //       if(this.overIndexes.length>0 && !(this.overIndexes.includes(comment.over_number))){
    //         console.log(overCommentry);

    //         this.allCommentry.push(overCommentry);
    //         this.overIndexes[comment.over_number] = {'overwicket' : overWicket, 'display_score' : comment.display_score, 'runs_scored' : overRun};
    //         overCommentry =[];
    //         overWicket = 0;
    //         overRun = 0;
    //       }
    //       if(this.overIndexes.length == 0 || !this.overIndexes.includes(comment.over_number))
    //         this.overIndexes.push(comment.over_number);
    //     }
    //     if(comment.type == 'wicket')
    //       overWicket++;
    //     overCommentry.push(comment);     

/*** End Second Logic for commentry and over count */

/** Old logic - For sometime  */
        // if(comment.type == 'ball'){ // && this.overIndexes.length > 0 && this.overIndexes.includes(comment.over_number)){
        //   if(this.overIndexes.length == 0 || (this.overIndexes.includes(comment.over_number))){
        //     if(!this.overIndexes.includes(comment.over_number))
        //       this.overIndexes.push(comment.over_number);
        //     temp.push(comment);
        //   }else{
        //     this.overIndexes.push(comment.over_number);
        //     this.allCommentry.push(temp);
        //     temp =[];
        //     temp.push(comment);
        //     console.log(this.allCommentry)
        //   }
        // }
        // else{
        //   temp.push(comment);
        // }
        // console.log(temp);

    // });
    // console.log(this.allCommentry)
    // console.log(this.overIndexes)

/** Matchended and close of play commentry */
    // this.closeOfplayData = data.filter(commentry => {return commentry.type == 'close_of_play' });
    // let matchended = data.filter(commentry => {return commentry.type == 'match_ended' }); 
    // this.closeOfplayData.push(matchended[0]);

/** First Inning */
    // for (let ball = 20; ball >= 1; ball--) {
    //   let temp = data.filter(commentry => {return commentry.over_number == ball && commentry.inning == 1; }) 
    //   if(temp.length > 0)
    //     this.firstInning.push(temp);
    // }

/** Second Inning */
    // for (let ball = 20; ball >= 1; ball--) {
    //   let temp = data.filter(commentry => {return commentry.over_number == ball && commentry.inning == 2; }) 
    //   if(temp.length > 0)
    //     this.secondInning.push(temp);
    // }