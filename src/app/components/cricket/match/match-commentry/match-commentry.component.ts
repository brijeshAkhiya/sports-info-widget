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
  inningWiseCommentry = [];
  showCommetry:boolean = false;
  interval;
  timeout;
  LiveOverSummery = [];

  constructor(
    public sportsService: SportsService
    ) {}

  ngOnInit() {    
    if(this.data.sport_event_status.status == 'closed' || this.data.sport_event_status.status == 'ended')
      this.getCommentries()
    else if(this.data.sport_event_status.status == 'not_started')
      this.startLiveUpdateAfterTime();    
    else if(this.data.sport_event_status.status == 'live'){
      this.getLiveUpdate(this);
      this.getCommentries();
    }   
  }

  /** Get all Commentries inning wise - support for more than 2 innings */
  getCommentries(){
    console.log("getCommentries");
    
    // loop of innings from statistics
    this.data.statistics.innings.forEach((innings, index) =>{
      
      // Store Inning wise data
      this.inningWiseCommentry[index] = {'inning' : innings.number, 'commentry' : [] };

      // Get all the data for this inning
      let currentInningCommentry = this.data.timeline.filter((commentry) => commentry.inning == innings.number);
      
      //for loop of overs_completd in inning  
      innings.overs.forEach((over, inningIndex) => {
        
        // get first index of this innings over
        let firstOverIndex = currentInningCommentry.findIndex((commentry) => commentry.over_number == over.number && commentry.inning == innings.number);
       
        // get last index of innings over
        let nextOver = over.number + 1;
        let lastOverIndex = currentInningCommentry.findIndex((commentry) => commentry.over_number == nextOver && commentry.inning == innings.number);
        
        // Single Over commentry of Inning - get commentry of current overs to Next Over
        console.log("lastOverIndex", lastOverIndex);
        console.log("firstOverIndex", firstOverIndex);        
        let overCommentry = []
        if(innings.number == 1 && over.number == 1)
          overCommentry = currentInningCommentry.slice(0, lastOverIndex);
        else if(lastOverIndex > 0)
           overCommentry = currentInningCommentry.slice(firstOverIndex, lastOverIndex);
        else if (firstOverIndex > 0)  
          overCommentry = currentInningCommentry.slice(firstOverIndex);
        
        /** Display Over Display Score */
        let overDisplayScore = [];
        if(overCommentry.length > 0){
          overCommentry = overCommentry.reverse().filter((comm) => typeof comm.batting_params != 'undefined' );
          overDisplayScore  = (typeof overCommentry != 'undefined' && overCommentry.length > 0 ? overCommentry[0].display_score : 0);
        }
        // Store over wise commentry and over stats
        this.inningWiseCommentry[index].commentry.push(
          {
            'stats' : {
              over_number : typeof over.number != 'undefined' ?  over.number : 0, 
              runs: typeof over.runs != 'undefined' ? over.runs : 0, 
              wickets: typeof over.wickets != 'undefined' ?  over.wickets : 0,
              abbreviation : this.getAbbreviation(innings.batting_team),
              display_score : overDisplayScore
            },
            'data' : overCommentry,
            'overs': over.number
          }
        )
      });
      // Reverse over commentry
      this.inningWiseCommentry[index].commentry = this.inningWiseCommentry[index].commentry.reverse();
    })

    // Reverse inning
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    
    // If there is no any commentry - Do not show commentry
    if(this.inningWiseCommentry.filter(comm => comm.length > 0).length > 0)
      this.showCommetry = true;

    console.log("this.inningWiseCommentry");      
    console.log(this.inningWiseCommentry);

  }

  getUpdate(){

    this.data.timeline.forEach((timeline, index) => {
      
      // Get Innings data of current inning 
      let currentInning = this.data.statistics.innings.filter((stats) => stats.number == timeline.inning);
      console.log("currentInning" , currentInning);    
      let currentInningOver  
      if(currentInning.length > 0){
        currentInningOver = currentInning[0].overs.filter((overs) => overs.number == timeline.over_number);
        console.log("currentInningOver" , currentInningOver);      
      }
      // This ball statistics
      let timelineStats  =  {
        over_number : (currentInningOver.length > 0) ?  currentInningOver[0].number : 0, 
        runs: (currentInningOver.length > 0) && typeof currentInningOver[0].runs != 'undefined' ? currentInningOver[0].runs : 0, 
        wickets: (currentInningOver.length > 0) && typeof currentInningOver[0].wickets != 'undefined'  ?  currentInningOver[0].wickets : 0,
        abbreviation : this.getAbbreviation(currentInning[0].batting_team),
        display_score : (typeof timeline.display_score != 'undefined' ? timeline.display_score : 0)
      }
      console.log(timeline);
      console.log(index);

      this.inningWiseCommentry[timeline.inning]
      console.log(this.inningWiseCommentry[timeline.inning]);
      
      // find index of current Inning
      let currentInningIndex = this.inningWiseCommentry.findIndex((innings) => innings.inning == timeline.inning)
      console.log("currentInningIndex" , currentInningIndex);      

      // Check if current inning is already exists in Array
      if(currentInningIndex >= 0){

        // Find Index of current Over in current Inning
        let currentOverIndex = this.inningWiseCommentry[currentInningIndex].commentry.findIndex((overs) => overs.overs == timeline.over_number)
        console.log("currentOverIndex" , currentOverIndex);     
        
        //
        let thisBallStats = {
          run : timelineStats.runs,
          wickets : timelineStats.wickets,
          wide : (timeline.bowling_params) ? timeline.bowling_params.extra_runs_conceded : 0

        }
        // Check if current over is already exists in innings Array
        if(currentOverIndex >= 0){
          
          // Find Index of current Ball in current over in current Inning
          console.log( this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data)
          let currentBallIndex 
          if(this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data.length > 0)
            currentBallIndex = this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data.findIndex((data) => timeline.ball_number == data.ball_number);
          else
            currentBallIndex = 0;
          console.log("currentBallIndex" , currentBallIndex);     


          // Check if current ball is already exists in over of innings Array
          if(currentBallIndex >= 0){
            // let temp = [];
            // temp.unshift(timeline)
            // this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data = temp;
          } else{
            this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data.unshift(timeline);
            this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].stats = timelineStats
            this.LiveOverSummery.push(thisBallStats);
          }          
        } 
        else{
          let temp = [];
          temp.unshift(timeline)
          let currentStats = timelineStats
          this.LiveOverSummery = [];
          this.LiveOverSummery.push({thisBallStats});

          this.inningWiseCommentry[currentInningIndex].commentry.unshift({'overs': timeline.over_number, 'data' : temp, 'stats':currentStats}) ;
        }
        console.log(this.LiveOverSummery)
      }
      else{
        // TODO - Create array of current Innings
      }
      
    })
    console.log("this.inningWiseCommentry");
    
    console.log(this.inningWiseCommentry)

    // Stop live update if Match is ended 
    if(this.data.sport_event_status.status == 'ended'){
      this.clearTimeInterval();
      return false;
    }
  }

  
  /** Get Match Live Update */
  getLiveUpdate(classThis){
    console.log("getLiveUpdate");
    this.interval =  setInterval(() => { 
      classThis.sportsService.getmatchtimelineDetla(classThis.data.sport_event.id).subscribe(res => {
        if(res.data.timeline && res.data.timeline.length > 0){
          this.data = res.data;
          this.getUpdate();
        }
      });
    }, 50000);
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime(){
    console.log("startLiveUpdateAfterTime");    
    let remainingTime = this.getRemainigTimeofMatch(); 
    let remainingMiliSec = this.miliseconds(remainingTime.hours, remainingTime.minutes, remainingTime.seconds)
    remainingMiliSec = remainingMiliSec - this.miliseconds(0, 30, 0) // Start timer before 30 min of match start  
    if(remainingTime.days == 0 && remainingTime.hours < 5 ){
      this.timeout = setTimeout(()=>{this.getLiveUpdate(this)}, remainingMiliSec);
    }
  }

  /** Get Abbreviation from competitor ID */
  getAbbreviation(id){
      let competitor = this.data.sport_event.competitors.filter((competitor) => competitor.id == id);
      return competitor[0].abbreviation;
  }

  /** Get Remaining Time of Match */
  getRemainigTimeofMatch(){
    let oneDay = 24*60*60*1000;
    let remainingdays ={days:0, hours:0, minutes:0, seconds:0};  
    let enddate = new Date(this.data.sport_event.scheduled).getTime();
    let now = new Date().getTime();    
    let time = enddate - now;

    remainingdays.days = Math.round(Math.abs((enddate - now)/(oneDay)));
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

  /** Get Milli seconds from Hr, min and seconds */
  miliseconds(hrs,min,sec){
      return((hrs*60*60+min*60+sec)*1000);
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval(){
    console.log("clearTimeInterval");    
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy(){
    // console.log("ngOnDestroy");
    this.clearTimeInterval();
  }

}