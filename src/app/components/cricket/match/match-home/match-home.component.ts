import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../../providers/sports-service";
import * as moment from "moment";
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: "app-match-home",
  templateUrl: "./match-home.component.html",
  styleUrls: ["./match-home.component.css"]
})
export class MatchHomeComponent implements OnInit {
  commonnewsparams = {};
  matchid: any;
  matchstatus: any;
  sportevent: any;
  hours: any;
  minutes: any;
  seconds: any;
  team1id: any;
  team2id: any;
  nextmatches: { day: string; data: any }[];
  lastmatches: any;
  matchesresultdata: any;
  venuedetails: any;
  manofthematch: any;
  scorecards: any;
  teams: { id: string; data: any }[];
  teamsbytype: { qualifier: string; data: any }[];
  matcheventstatus: any;
  battingteam1: any = [];
  battingteam2: any = [];
  bowlingteam1: any = [];
  bowlingteam2: any = [];
  objnew = {};
  objnew2 = {};
  objnew3 = {};
  venuelat: any;
  venuelong: any;
  matchprobability: any;
  matchdata: any;
  widget1title = "Recommended Links";
  widget1type = "currentseries";
  fallofwicket1data = [];
  fallofwicket2data = [];
  teamObj = {};


  data: any;
  timeline: any;
  statistics: any;
  inningWiseCommentry = [];
  showCommetry:boolean = false;
  interval;
  timeout;
  LiveOverSummery = [];
  ballerList: any;
  competitor: any;
  closeofCommentry: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private router: Router
  ) {
    console.log("constructor");
    this.matchid = atob(this.activatedroute.snapshot.params.id);
    this.activatedroute.params.subscribe(params => {
      
      this.initData();

      this.matchid = atob(params.id);
      if (this.matchid) {
        this.getMatchTimeline();
      }
    });
  }

  ngOnInit() {
    console.log("ngOnInit");
    
    // this.getMatchTimeline();
  }

  //get matchtimeline
  getMatchTimeline() {
    console.log("getMatchTimeline");
    
    this.sportsService.getmatchtimeline(this.matchid).subscribe(
      res => {
        if (res["data"]) {
          this.data = res["data"];
          this.initMatch();


          this.matchdata = res["data"];
          console.log("data", res["data"]);
          this.matchstatus = res["data"]["sport_event_status"].status;
          this.sportevent = res["data"]["sport_event"];
          this.venuedetails = res["data"]["sport_event"]["venue"];
          this.team1id = res["data"]["sport_event"]["competitors"][0].id;
          this.team2id = res["data"]["sport_event"]["competitors"][1].id;
          
          if (this.team1id && this.team2id) {
            console.log('teamvstaem');
            
            this.getTeamvsTeamdata(); //to get team vs team data
          }

          if (this.venuedetails) {
            if(this.venuedetails.map_coordinates){
            let cordinates = this.venuedetails.map_coordinates.split(",");
            this.venuelat = Number(cordinates[0]);
            this.venuelong = Number(cordinates[1]);
            }
            else {
              this.venuelat = 22.5726;
              this.venuelong = 88.363;
            }
          } 
          //teams array
          let obj = {};
          let team_arr = res["data"]["sport_event"]["competitors"];
          team_arr.map(single => {
            if (!obj[single.id]) {
              obj[single.id] = [];
            }
          });
          team_arr.map(data => {
            obj[data.id].push(data);
          });

          this.teams = Object.keys(obj).map(id => ({ id, data: obj[id] }));
          console.log(this.teams)

          let team_arr2 = [];
          let obj2 = {};
          team_arr2 = res["data"]["sport_event"]["competitors"];
          team_arr2.map(single => {
            if (!obj2[single.qualifier]) {
              obj2[single.qualifier] = [];
            }
          });
          team_arr2.map(data => {
            obj2[data.qualifier].push(data);
          });

          this.teamsbytype = Object.keys(obj2).map(qualifier => ({
            qualifier,
            data: obj2[qualifier]
          }));

          this.teamsbytype.map(data => {
            this.teamObj[data.data[0].id] = data;
          });

         
          if (this.matchstatus == "not_started") {
            // let date = this.sportevent.scheduled;
            // setInterval(() => {
            //   let enddate = new Date(date).getTime();
            //   let now = new Date().getTime();
            //   let time = enddate - now;
            //   if (time >= 0) {
            //     this.hours = Math.floor(
            //       (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            //     );
            //     this.minutes = Math.floor(
            //       (time % (1000 * 60 * 60)) / (1000 * 60)
            //     );
            //     this.seconds = Math.floor((time % (1000 * 60)) / 1000);
            //   }
            // }, 1000);
            this.getMatchProbability();
          } else if (
            this.matchstatus == "closed" ||
            this.matchstatus == "live"
          ) {
            this.manofthematch = res["data"]["statistics"]["man_of_the_match"];
            this.matcheventstatus = res["data"]["sport_event_status"];
            this.scorecards = res["data"]["statistics"]["innings"];
            let objBatting = {};
            let objBowling = {};

            this.scorecards.map((data, key) => {
              data["teams"][0]["statistics"]["batting"]["players"].map(
                single => {
                  if (!objBatting[single.id]) {
                    objBatting[single.id] = [];
                    objBatting[single.id].push(single);
                  }
                }
              );
              data["teams"][1]["statistics"]["bowling"]["players"].map(
                single => {
                  if (!objBowling[single.id]) {
                    objBowling[single.id] = [];
                    objBowling[single.id].push(single);
                  }
                }
              );
            });

            //players name object
            this.objnew3 = {
              ...objBowling,
              ...objBatting
            };
            //<------------old logic for scorecard ----------->>>>>>
            // this.scorecards.map(data => {
            //   if (data.batting_team === this.teams[0].data[0].id) {
            //     this.battingteam1.push(data);
            //   } else if (data.batting_team === this.teams[1].data[0].id) {
            //     this.battingteam2.push(data);
            //   }
            //   if (data.bowling_team == this.teams[0].data[0].id) {
            //     this.bowlingteam1.push(data);
            //   } else if (data.bowling_team == this.teams[1].data[0].id) {
            //     this.bowlingteam2.push(data);
            //   }
            // });

            // console.log("scorecards", this.scorecards);
            // this.battingteam1 = this.battingteam1[0]["teams"][0]["statistics"][
            //   "batting"
            // ];
            // console.log("battin1", this.battingteam1);

            // this.battingteam2 = this.battingteam2[0]["teams"][0]["statistics"][
            //   "batting"
            // ];
            // this.bowlingteam1 = this.bowlingteam1[0]["teams"][1]["statistics"][
            //   "bowling"
            // ];
            // this.bowlingteam2 = this.bowlingteam2[0]["teams"][1]["statistics"][
            //   "bowling"
            // ];

            // let arrnew = [];

            // arrnew = this.battingteam2["players"];
            // arrnew.map(single => {
            //   if (!this.objnew[single.id]) {
            //     this.objnew[single.id] = [];
            //   }
            // });
            // arrnew.map(data => {
            //   this.objnew[data.id].push(data);
            // });
            // console.log("objnew", this.objnew);

            //map array for team 2 bowlers name

            // let playerarr = [];
            // playerarr = this.battingteam1["players"];
            // playerarr.map(single => {
            //   if (!this.objnew2[single.id]) {
            //     this.objnew2[single.id] = [];
            //   }
            // });
            // playerarr.map(data => {
            //   this.objnew2[data.id].push(data);
            // });

            //<<<<<----------old scorecard logic over ------->>>>>>

            //calculate fall of wickets data
            let fallofwircket1 = [];
            fallofwircket1 = this.matchdata["timeline"];
            let fallof1data = [];
            fallofwircket1.map(data => {
              if (data.inning == 1 && data.type == "wicket") {
                this.fallofwicket1data.push({
                  playerid: data.dismissal_params.player.id,
                  playername: data.dismissal_params.player.name,
                  displayover: data.display_overs,
                  displayscore: data.display_score
                });
              }
            });
            let fallofwircket2 = [];
            fallofwircket2 = this.matchdata["timeline"];
            let fallof2data = [];
            fallofwircket1.map(data => {
              if (data.inning == 2 && data.type == "wicket") {
                this.fallofwicket2data.push({
                  playerid: data.dismissal_params.player.id,
                  playername: data.dismissal_params.player.name,
                  displayover: data.display_overs,
                  displayscore: data.display_score
                });
              }
            });
          }
        }
      },
      error => {
        if (error["error"].status == 400 || error["error"].status == 403) {
          this.router.navigate(["/page-not-found"]);
        }
      }
    );
  }

  //get match probablities

  getMatchProbability() {
    this.sportsService.getmatchprobability(this.matchid).subscribe(res => {
      this.matchprobability = res["data"];
    });
  }

  //get match related articles
  getarticles() {
    this.commonnewsparams = {
      eSport: "Cricket",
      nStart: 0,
      nLimit: 4,
      aIds: [this.matchid]
    };
  }
  //get team versus team data

  getTeamvsTeamdata() {
    this.sportsService
      .getteamvsteamdata(this.team1id, this.team2id)
      .subscribe(res => {
        if (res["data"]) {
          let dataarray = [];
          dataarray = res["data"].next_meetings;
          let dateObj = {};
          dataarray.map(data => {
            let mdate = moment(data.scheduled).format("Do MMMM YYYY");
            if (!dateObj[mdate]) {
              dateObj[mdate] = [];
            }
          });
          dataarray.map(data => {
            let mdate = moment(data.scheduled).format("Do MMMM YYYY");
            dateObj[mdate].push(data);
          });
          this.nextmatches = Object.keys(dateObj).map(day => ({
            day,
            data: dateObj[day]
          }));

          //map array for last matches

          this.lastmatches = res["data"].last_meetings;
          console.log('last meeting',this.lastmatches);
          
          this.lastmatches = this.lastmatches.map(data => {
            let obj = {};
            let team_arr = data["competitors"];
            team_arr.map(single => {
              obj[single.qualifier] = single;
            });
            let period_score_new = data["period_scores"];
            if (period_score_new) {
              period_score_new = period_score_new.map(singleb => {
                if (singleb.away_score !== undefined) {
                  return { ...singleb, team: obj["away"], teamFlag: true };
                } else {
                  return { ...singleb, team: obj["home"], teamFlag: false };
                }
              });
              return { ...data, period_score_new };
            } else {
              return data;
            }
          });
        }

        //sort matches result by date
        let dateObj = {};
        this.lastmatches.map(data => {
          let mdate = moment(data.scheduled).format("Do MMMM YYYY");
          if (!dateObj[mdate]) {
            dateObj[mdate] = [];
          }
        });
        this.lastmatches.map(data => {
          let mdate = moment(data.scheduled).format("Do MMMM YYYY");
          dateObj[mdate].push(data);
        });
        this.matchesresultdata = Object.keys(dateObj).map(day => ({
          day,
          data: dateObj[day]
        }));
      });
  }

  //get match detail
  matchDetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }

  getTeam1playername(id) {
    this.battingteam2["players"].map(data => {
      if (id === data.id) {
        console.log(data.name);
        return data.name;
      }
    });
  }

  initData(){
    console.log("initdata");
    
    this.data = "";
    this.timeline;
    this.statistics;
    this.inningWiseCommentry;
    this.showCommetry;
    this.interval;
    this.timeout;
    this.LiveOverSummery;
    this.ballerList;
    this.competitor;
    this.closeofCommentry;
  }

  /** Init Match */
  initMatch(){
    if(this.data.sport_event_status.status == 'closed' || this.data.sport_event_status.status == 'ended'){
      this.getCommentries()
    }else if(this.data.sport_event_status.status == 'not_started')
      this.startLiveUpdateAfterTime();    
    else if(this.data.sport_event_status.status == 'live'){
      this.getLiveUpdate(this);
      this.getCommentries();
    }   
    this.getScores()
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
      if(typeof innings.overs == 'undefined' || innings.overs.length <= 0){


        if(typeof this.inningWiseCommentry[0] == 'undefined')
          this.inningWiseCommentry[0] = {'commentry' : []} ;
          
        console.log(this.inningWiseCommentry[0].commentry)
        if(this.inningWiseCommentry[0].commentry.length <= 0)
          this.inningWiseCommentry[0].commentry[0] = {};

        let temp = [];
        temp.unshift(this.data.timeline)
        this.inningWiseCommentry[0].commentry.unshift({'data' : temp, 'overs': 0});
        return false;

        return false; 
      }
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
        else if (firstOverIndex > 0){  
          console.log("else if");
          let lastOverIndex = currentInningCommentry.findIndex((commentry) => commentry.type == 'match_ended' || commentry.type == 'close_of_play');
          
          console.log("lastOverIndex", lastOverIndex);
          console.log("firstOverIndex", firstOverIndex);    
          if(lastOverIndex > 0)    
            overCommentry = currentInningCommentry.slice(firstOverIndex, lastOverIndex);
          else
            overCommentry = currentInningCommentry.slice(firstOverIndex);
        }
        /** Display Over Display Score */
        let overDisplayScore = [];
        if(overCommentry.length > 0){
          let tempCommentry = overCommentry.reverse().filter((comm) => typeof comm.batting_params != 'undefined' );
          overDisplayScore  = (typeof tempCommentry != 'undefined' && tempCommentry.length > 0 ? tempCommentry[0].display_score : 0);
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

    
    // If there is no any commentry - Do not show commentry
    if(this.inningWiseCommentry.filter(comm => comm.length > 0)){
      this.showCommetry = true;

      // Add Close of play at last
      let temp = this.data.timeline.filter((commentry) => commentry.type == 'close_of_play');
      this.inningWiseCommentry[this.inningWiseCommentry.length - 1 ].commentry.unshift({ 'data' :  temp});
    }

    // Reverse inning
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    console.log("this.inningWiseCommentry");      
    console.log(this.inningWiseCommentry);

  }

  /** Get Live Commentries inning wise*/
  getUpdate(){

    this.data.timeline.forEach((timeline, index) => {
      
      // When inning is not yet started
      console.log(typeof this.data.statistics == 'undefined' || typeof this.data.statistics.innings == 'undefined');
      
      if(typeof this.data.statistics == 'undefined' || typeof this.data.statistics.innings == 'undefined'){
        if(typeof this.inningWiseCommentry[0] == 'undefined')
          this.inningWiseCommentry[0] = {'commentry' : []} ; 

        this.inningWiseCommentry[0].commentry[0].data.unshift(timeline);
        return false;
      }

      // Get Innings data of current inning 
      let currentInning = this.data.statistics.innings.filter((stats) => stats.number == timeline.inning);
      console.log("currentInning" , currentInning);    
      let currentInningOver = []  
      if(currentInning.length > 0 && typeof currentInning[0].overs != 'undefined'){
        currentInningOver = currentInning[0].overs.filter((overs) => overs.number == timeline.over_number);
        console.log("currentInningOver" , currentInningOver);      
      }
      // This ball statistics
      let timelineStats  =  {
        over_number : (currentInningOver.length > 0) ?  currentInningOver[0].number : 0, 
        runs: (currentInningOver.length > 0) && typeof currentInningOver[0].runs != 'undefined' ? currentInningOver[0].runs : 0, 
        wickets: (currentInningOver.length > 0) && typeof currentInningOver[0].wickets != 'undefined'  ?  currentInningOver[0].wickets : 0,
        abbreviation : (currentInning.length > 0)  ? this.getAbbreviation(currentInning[0].batting_team) : '',
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
          if(currentBallIndex < 0){
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

        if(typeof this.inningWiseCommentry[0] == 'undefined')
          this.inningWiseCommentry[0] = {'commentry' : []} ;
          
        console.log(timeline)
        console.log(this.inningWiseCommentry[0].commentry.length, this.inningWiseCommentry[0].commentry.length <= 0);
        
        if(this.inningWiseCommentry[0].commentry.length <= 0){
          let temp = [];
          temp.unshift(timeline)
          this.inningWiseCommentry[0].commentry[0] = {'data' : temp};
        }else{
          let isExist = this.inningWiseCommentry[0].commentry[0].data.filter((comment) => {return comment.id == timeline.id})
          if(isExist.length <= 0)
            this.inningWiseCommentry[0].commentry[0].data.unshift(timeline);
        }
        return false;
      }

      // Get current batsman and ballers
      // this.getCurrentPlayers(currentInning)

      
    })
    console.log("this.inningWiseCommentry");    
    console.log(this.inningWiseCommentry)

    // Stop live update if Match is ended 
    if(this.data.sport_event_status.status == 'ended'){
      this.clearTimeInterval();
      return false;
    }
  }

  /** Get Live scores in match detail header */
  getScores(){

    console.log(this.data.sport_event.competitors);
    let compObj = {};
    this.data.sport_event.competitors.map(s => (compObj[s.qualifier] = s));
    if ( this.data.sport_event_status.period_scores) {
      this.data.sport_event_status.period_scores.map(sPScore => {
        if (sPScore.home_score) {
          if (!compObj["home"].period_scores) {
            compObj["home"].period_scores = [];
          }
          compObj["home"].period_scores.push(sPScore);
        } else if (sPScore.away_score) {
          if (!compObj["away"].period_scores) {
            compObj["away"].period_scores = [];
          }
          compObj["away"].period_scores.push(sPScore);
        }
      });
    }
    console.log(compObj);
    
    this.competitor = compObj;
    console.log(this.competitor);

  }

  /** Get current Batsman and Ballers */
  getCurrentPlayers(currentInning){
    console.log(currentInning);
    
    let batsmanList = currentInning[0].teams.filter((players) => players.statistics.batting);
    this.ballerList = currentInning[0].teams.filter((players) => players.statistics.bowling);
    console.log(batsmanList);
    this.ballerList = this.ballerList[0].statistics.bowling.players;
    console.log(this.ballerList);
    
  }
  
  /** Get Match Live Update */
  getLiveUpdate(classThis){
    console.log("getLiveUpdate");
    this.interval =  setInterval(() => { 
      classThis.sportsService.getmatchtimelineDetla(classThis.data.sport_event.id).subscribe(res => {

        // If no live coverage then no need to call API again
        if(typeof res.data.coverage_info != 'undefined' && res.data.coverage_info.live_coverage == false){
          this.clearTimeInterval();
        }

        // Update Commnetry and scores
        if(res.data.timeline && res.data.timeline.length > 0){
          this.data = res.data;
          this.getUpdate();
          this.getScores();
        }
      });
    }, classThis.miliseconds(0,0,10));
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
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }

}
