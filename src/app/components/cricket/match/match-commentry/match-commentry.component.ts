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
  interval;
  timeout;

  constructor(
    public sportsService: SportsService
    ) {}

  ngOnInit() {
    
    if(this.data.sport_event_status.status == 'closed' || this.data.sport_event_status.status == 'ended')
      this.getLiveCommentries()
    else if(this.data.sport_event_status.status == 'not_started')
      this.startLiveUpdateAfterTime();    
    else if(this.data.sport_event_status.status == 'live'){
      this.getLiveUpdate(this);
      // this.getCommentry();
      this.getLiveCommentries();
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

  getLiveCommentries(){
    console.log("getLiveCommentries");
    
    let allCommentry;
    // for loop of innings
    this.data.statistics.innings.forEach((innings, index) =>{
      console.log(index);
      console.log(innings);

      //for loop of overs_completd in inning current inning
      this.inningWiseCommentry[index] = {'inning' : innings.number, 'commentry' : [] };
      innings.overs.forEach((over, inningIndex) => {

        console.log("inningIndex" +inningIndex);
        console.log(over);
        let currentInningCommentry = this.data.timeline.filter((commentry) => commentry.inning == innings.number);
        console.log(currentInningCommentry);
        let firstIndex = currentInningCommentry.findIndex((commentry) => commentry.over_number == over.number && commentry.inning == innings.number);
        console.log(firstIndex);
        let temp = over.number + 1;
        let lastIndex = currentInningCommentry.findIndex((commentry) => commentry.over_number == temp && commentry.inning == innings.number);
        console.log(lastIndex);

        let overCommentry
        if(innings.number == 1 && over.number == 1)
          overCommentry = currentInningCommentry.slice(0, lastIndex);
        else if(lastIndex > 0)
           overCommentry = currentInningCommentry.slice(firstIndex, lastIndex);
        else   
          overCommentry = currentInningCommentry.slice(firstIndex);
        
          console.log(overCommentry)
        this.inningWiseCommentry[index].commentry.push(
          {
            'stats' : {
              over_number : typeof over.number != 'undefined' ?  over.number : 0, 
              runs: typeof over.runs != 'undefined' ? over.runs : 0, 
              wickets: typeof over.wickets != 'undefined' ?  over.wickets : 0
            },
            'data' : overCommentry.reverse(),
            'overs': over.number
          }
        )
        // get commentry of current overs to prevIndex

      });
      this.inningWiseCommentry[index].commentry = this.inningWiseCommentry[index].commentry.reverse();

    })
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    if(this.inningWiseCommentry.filter(comm => comm.length > 0).length > 0)
      this.showCommetry = true;
    console.log(this.inningWiseCommentry);

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
    console.log("startLiveUpdateAfterTime");
    
    let remainingTime = this.getRemainigTimeofMatch();
    console.log(remainingTime);
    let remainingMiliSec = this.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds)
    if(remainingTime.days == 0 && remainingTime.hours < 5 ){
      this.timeout = setTimeout(()=>{this.getLiveUpdate(this)}, remainingMiliSec);
    }
  }
  getLiveUpdate(classThis){
    console.log("getLiveUpdate");
    this.interval =  setInterval(() => { 
      classThis.sportsService.getmatchtimelineDetla(classThis.data.sport_event.id).subscribe(res => {
        console.log(res);
        if(res.data.timeline && res.data.timeline.length > 0){
          this.data = res.data;
          this.getUpdate();
          // this.getLiveCommentries();
        }
      });
    }, 30000);
  }

  getUpdate(){
    console.log(this.data.sport_event_status.status);
    
    if(this.data.sport_event_status.status == 'ended')
      this.clearTimeInterval();
    else{  

    this.data.timeline.forEach((timeline, index) => {

      let currentStatsInning = this.data.statistics.innings.filter((stats) => stats.number == timeline.inning);
      console.log("currentStatsInning" , currentStatsInning);    
      let currentStatsOver  
      if(currentStatsInning.length > 0){
        currentStatsOver = currentStatsInning[0].overs.filter((overs) => overs.number == timeline.over_number);
        console.log("currentStatsOver" , currentStatsOver);      
      }

      console.log(timeline);
      console.log(index);
      // this.inningWiseCommentry[timeline.inning]
      console.log(this.inningWiseCommentry[timeline.inning]);
      let currentInningIndex = this.inningWiseCommentry.findIndex((innings) => innings.inning == timeline.inning)
      console.log("currentInningIndex" , currentInningIndex);      
      if(currentInningIndex >= 0){
        let currentOverIndex = this.inningWiseCommentry[currentInningIndex].commentry.findIndex((overs) => overs.overs == timeline.over_number)
        console.log("currentOverIndex" , currentOverIndex);     
        if(currentOverIndex >= 0){
          console.log(this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data)
          let currentBallIndex = this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data.findIndex((data) => timeline.ball_number == data.ball_number);
          console.log("currentBallIndex" , currentBallIndex);     
          console.log(this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data[currentBallIndex]); 
          if(currentBallIndex >= 0){
            // this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data = timeline;
          } else{
            this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data.unshift(timeline);
            this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].stats = {
              over_number : (currentStatsOver.length > 0) ?  currentStatsOver[0].number : 0, 
              runs: (currentStatsOver.length > 0) && typeof currentStatsOver[0].runs != 'undefined' ? currentStatsOver[0].runs : 0, 
              wickets: (currentStatsOver.length > 0) && typeof currentStatsOver[0].wickets != 'undefined'  ?  currentStatsOver[0].wickets : 0
            }
          }          
        } 
        else{
          let temp = [];
          temp.unshift(timeline)
          let currentStats = {
            over_number : (currentStatsOver.length > 0) ?  currentStatsOver[0].number : 0, 
            runs: (currentStatsOver.length > 0) && typeof currentStatsOver[0].runs != 'undefined' ? currentStatsOver[0].runs : 0, 
            wickets: (currentStatsOver.length > 0) && typeof currentStatsOver[0].wickets != 'undefined'  ?  currentStatsOver[0].wickets : 0
          }

          this.inningWiseCommentry[currentInningIndex].commentry.unshift({'overs': timeline.over_number, 'data' : temp, 'stats':currentStats}) ;
        }
      }
      
    })
  
    }
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
  ngOnDestroy(){
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }

  clearTimeInterval(){
    console.log("clearTimeInterval");
    
    clearInterval(this.interval);
    clearTimeout(this.timeout);
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