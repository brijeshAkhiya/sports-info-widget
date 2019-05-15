import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from "../../../../providers/sports-service";

@Component({
  selector: 'app-match-commentry',
  templateUrl: './match-commentry.component.html',
  styleUrls: ['./match-commentry.component.css']
})
export class MatchCommentryComponent implements OnInit {

  @Input() data: any;

  timeline: any;
  statistics: any;

  // firstInning = [];
  // firstInningCommentry = [];
  // secondInning = [];
  // secondInningCommentry = [];

  inningWiseCommentry = [];
  showCommetry:boolean = false;
  constructor(
    public sportsService: SportsService
    ) {
      console.log(this);
      
     }

  ngOnInit() {
    
    if(this.data.sport_event_status.status == 'closed')
      this.getCommentry()
    else if(this.data.sport_event_status.status == 'not_started')
      this.startLiveUpdateAfterTime();    
    else if(this.data.sport_event_status.status == 'live'){
      this.getLiveUpdate(this);
      this.getCommentry();
    }    
    this.getLiveUpdate(this);
  }

  getCommentry(){
    console.log("get commentry");
    this.inningWiseCommentry = [];
    this.timeline = this.data.timeline;
    this.statistics = this.data.statistics;

    let prevIndex = 0;
    this.data.statistics.innings.forEach((inning, index) =>{
      let indexOfInning = this.timeline.findIndex((commentry) => commentry.inning == inning.number + 1);
      console.log(indexOfInning);
      let currentInning
      if(indexOfInning > 0)
        currentInning = this.timeline.slice(prevIndex, indexOfInning);
      else
        currentInning = this.timeline.slice(prevIndex);
      console.log(currentInning)
      prevIndex = indexOfInning;
      this.inningWiseCommentry.push(this.createCommentry(currentInning, index));
    });
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    
    if(this.inningWiseCommentry.filter(comm => comm.length > 0).length > 0)
      this.showCommetry = true;
    
    console.log(this.inningWiseCommentry);
    
    
    // let indexOfSecondInning = this.timeline.findIndex((commentry) => commentry.inning == 2);
    
    // this.firstInning = this.timeline.slice(0, indexOfSecondInning);
    // let statsFirstIndex = this.statistics.innings.findIndex((stats) => stats.number == 1);
    // this.firstInningCommentry = this.createCommentry(this.firstInning, statsFirstIndex);
    // console.log(this.firstInningCommentry);

    // this.secondInning = this.timeline.slice(indexOfSecondInning);
    // let statsSecondIndex = this.statistics.innings.findIndex((stats) => stats.number == 2);
    // if(statsSecondIndex> -1)
    // this.secondInningCommentry = this.createCommentry(this.secondInning, statsSecondIndex);
    // console.log(this.secondInningCommentry);

  }

  createCommentry(inning, statsIndex) {
    console.log(statsIndex);
    
    let currentInningStats = this.statistics.innings[statsIndex];
    let InningCommentry = []
    let firstIndex = 0;
    let lastIndex;
    
    for (let i = 1; i <= currentInningStats.overs_completed + 1; i++) {
      lastIndex = inning.findIndex((ele) => ele.over_number == i + 1);
      let currentOverData = inning.slice(firstIndex, lastIndex)
      firstIndex = lastIndex;
      // console.log(currentInningStats);
      if( typeof currentInningStats.overs != 'undefined' && currentInningStats.overs.length > 0){
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
    }
    return InningCommentry.reverse();
  }

  startLiveUpdateAfterTime(){
    
    let remainingTime = this.getRemainigTimeofMatch();
    console.log(remainingTime);
    let remainingMiliSec = this.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds)
    if(remainingTime.days == 0 && remainingTime.hours < 5 ){
      setTimeout(()=>{this.getLiveUpdate(this)}, remainingMiliSec);
    }
  }
  getLiveUpdate(classThis){
    console.log("getLiveUpdate");
    setInterval(() => { 
      classThis.sportsService.getmatchtimelineDetla(classThis.data.sport_event.id).subscribe(res => {
        console.log(res);
        if(res.data.timeline.length > 0){
          this.data = res.data;
          this.getCommentry();
        }
      });
    }, 10000);
  }

  getRemainigTimeofMatch(){
    let date = this.data.sport_event.scheduled;
    let oneDay = 24*60*60*1000;
    let remainingdays ={days:0, hours:0, minutes:0, seconds:0};
  
    let enddate = new Date(date).getTime();
    let now = new Date().getTime();
    console.log("now", now);
    
    let time = enddate - now;
    remainingdays.days = Math.round(Math.abs((enddate - now)/(oneDay)));
    // this.days = time.Date() -1
    if (time >= 0) {
      remainingdays.hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      remainingdays.minutes = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
      );
      remainingdays.seconds = Math.floor((time % (1000 * 60)) / 1000);
    }

    return remainingdays;

  }

  miliseconds(hrs,min,sec){
      return((hrs*60*60+min*60+sec)*1000);
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