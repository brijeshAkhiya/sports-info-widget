import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../../providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";
import * as moment from "moment";

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
  lastmatches = [];
  matchesresultdata: any;
  venuedetails: any;
  manofthematch: any;
  scorecards = [];
  teams: { id: string; data: any }[];
  // teamsbytype: { qualifier: string; data: any }[];
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
  showCommetry: boolean = false;
  interval;
  timeout;
  LiveOverSummery = [];
  ballerList: any;
  competitor: any = [];
  closeofCommentry: any;
  stylepercentage: any;
  isshow: boolean;
  tossdecision: any = {};
  batsmanList;

  testcheck: any;

  fallofWickets = [];
  playerList = {};

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private router: Router,
    private cricketService: CricketService,
    private commonService: CommonService
  ) {
    console.log("constructor");
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.matchid = atob(this.activatedroute.snapshot.params.id);
    this.activatedroute.params.subscribe(params => {
      this.matchid = atob(params.id);
      if (this.matchid) {
        // this.getMatchTimeline();
        this.getMatchData();
      }
    });
  }

  ngOnInit() {}

  /** Get Match Data */
  getMatchData() {
    this.sportsService.getmatchtimeline(this.matchid).subscribe(
      (res: any) => {
        this.isshow = true;
        if (res.data) {
          console.log(res.data);
          
          this.isshow = false;
          this.matchdata = res.data;
          this.getmatchteamlineup();
          this.data = res.data;
          this.getTeams();
          if (this.matchdata.sport_event_status.status == "not_started")
            this.startLiveUpdateAfterTime();
          else if (
            this.matchdata.sport_event_status.status == "closed" ||
            this.matchdata.sport_event_status.status == "ended"
          ) {
            this.getCommentries();
            this.getFallWickets();
            this.getScores();
          } else if (this.matchdata.sport_event_status.status == "live") {
            this.getLiveUpdate(this);
            this.getCommentries();
            this.getFallWickets();
            this.getTossDecision();
            this.getScores();
          }
        }
      },
      error => {
        if (error["error"].status == 400 || error["error"].status == 403) {
          this.isshow = false;
          this.router.navigate(["/page-not-found"]);
        }
      }
    );
  }

  /** GET TEAMS */
  getTeams() {
    console.log("getTeams");
    if (this.matchdata.sport_event.competitors) {
      this.getTeamvsTeamdata(); //to get team vs team data
      this.matchdata.sport_event.competitors.forEach(element => {
        this.teamObj[element.id] = element;

        if (this.competitor && !this.competitor[element.qualifier])
          this.competitor[element.qualifier] = [];
        this.competitor[element.qualifier] = element;
      });
    }
    console.log(this.teamObj);
  }

  /** Get Fall of Wickets */
  getFallWickets() {
    if (this.matchdata.timeline) {
      this.matchdata.timeline.map(data => {
        if (data.type == "wicket") {
          if (!this.fallofWickets[data.inning])
            this.fallofWickets[data.inning] = [];

          this.fallofWickets[data.inning].push({
            playerid: data.dismissal_params.player.id,
            playername: data.dismissal_params.player.name,
            displayover: data.display_overs,
            displayscore: data.display_score
          });
        }
      });
    }
    console.log("this.fallofWickets", this.fallofWickets);
  }

  //get matchtimeline
  getMatchTimeline() {
    this.isshow = true;
    this.sportsService.getmatchtimeline(this.matchid).subscribe(
      res => {
        if (res["data"]) {
          this.isshow = false;
          this.data = res["data"];
          this.matchdata = res["data"];
          console.log("data::::", res["data"]);
          this.matchstatus = res["data"]["sport_event_status"].status;
          this.sportevent = res["data"]["sport_event"];
          this.venuedetails = res["data"]["sport_event"]["venue"];
          this.team1id = res["data"]["sport_event"]["competitors"][0].id;
          this.team2id = res["data"]["sport_event"]["competitors"][1].id;
          if (this.team1id && this.team2id) {
            console.log("teamvstaem");
            this.getTeamvsTeamdata(); //to get team vs team data
          }

          if (this.matchstatus == "not_started") {
            console.log("status::", this.matchstatus);
            // this.getMatchProbability();
          } else if (
            this.matchstatus == "closed" ||
            this.matchstatus == "live"
          ) {
            this.manofthematch = res["data"]["statistics"]["man_of_the_match"];
            this.matcheventstatus = res["data"]["sport_event_status"];
            this.scorecards = res["data"]["statistics"]["innings"];
            console.log('scorecards',this.scorecards);
            
            this.getmatchteamlineup();
          }

          this.getTossDecision();

          this.getCommentries();
        }
      },
      error => {
        if (error["error"].status == 400 || error["error"].status == 403) {
          this.isshow = false;
          this.router.navigate(["/page-not-found"]);
        }
      }
    );
  }

  /** Get Match Players - Line up */
  getmatchteamlineup() {
    if (this.matchid) {
      this.sportsService.getmatchteamlineup(this.matchid).subscribe(
        (res: any) => {
          if (res.data) {
            let players = res.data.lineups[0].starting_lineup.concat(
              res.data.lineups[1].starting_lineup
            );
            players.map(single => {
              if (!this.playerList[single.id]) {
                this.playerList[single.id] = [];
                this.playerList[single.id].push(single);
              }
            });
          }
        },
        (error)=>{
          console.log('errorrrrrr:::::::::');
          if(error){
  
                let objBatting = {};
                let objBowling = {};
                //old logic for get players name

                
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
                // players name object
                this.playerList = {
                  ...objBowling,
                  ...objBatting
              }
            
          }
        }
      
      );
    }
    console.log("playerList:::", this.playerList);
  }

  //get team versus team data
  getTeamvsTeamdata() {
    this.sportsService
      .getteamvsteamdata(
        this.matchdata.sport_event.competitors[0].id,
        this.matchdata.sport_event.competitors[1].id
      )
      .subscribe((res: any) => {
        if (res.data) {
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

          // this.lastmatches = res["data"].last_meetings;
          res["data"].last_meetings.map(data => {
            if (data.match_status && data.match_status == "ended") {
              this.lastmatches.push(data);
            }
          });
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
          console.log(this.lastmatches);
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

  /** Get Toss decision */
  getTossDecision() {
    console.log("getTossDecision");

    if (Object.entries(this.tossdecision).length === 0) {
      if (typeof this.data.sport_event_status.toss_won_by != "undefined") {
        this.tossdecision.toss_won_by = this.data.sport_event_status.toss_won_by;
        console.log(this.teamObj);

        if (this.teamObj[this.data.sport_event_status.toss_won_by])
          this.tossdecision.toss_won_by_team = this.teamObj[
            this.data.sport_event_status.toss_won_by
          ].name;
      }

      if (typeof this.data.sport_event_status.toss_decision != "undefined")
        this.tossdecision.toss_decision = this.data.sport_event_status.toss_decision;
    }
    console.log(this.tossdecision);
  }

  /** Check if there is no commentry from API */
  checkCommentry() {
    if (!this.data.timeline) return [];
    return this.data.timeline.filter(timeline => {
      return timeline.commentaries;
    });
  }

  getCurrentOverSummery() {
    let currentInning = this.inningWiseCommentry.filter(innings => {
      return innings.inning == this.data.sport_event_status.current_inning;
    });
    let currentOver = currentInning[0].commentry.filter(overData => {
      return (
        overData.overs ==
        Math.floor(this.data.sport_event_status.display_overs) + 1
      );
    });
    if (currentOver.length > 0) {
      currentOver[0].data.forEach(element => {
        if (element.batting_params) {
          this.LiveOverSummery.unshift({
            over: element.over_number,
            run:
              typeof element.batting_params != "undefined"
                ? element.batting_params.runs_scored
                : 0,
            wickets: element.type == "wicket" ? "W" : "",
            ball: element.ball_number,
            extra_runs:
              typeof element.bowling_params.extra_runs_conceded != "undefined"
                ? element.bowling_params.extra_runs_type
                : 0
          });
        }
      });
    }
    console.log(this.LiveOverSummery);
  }

  /** Get all Commentries inning wise - support for more than 2 innings */
  getCommentries() {
    console.log("getCommentries");

    // check if commentry exists
    console.log(this.checkCommentry().length);
    if (this.checkCommentry().length <= 0) {
      this.showCommetry = false;
      return false;
    }

    // loop of innings from statistics
    this.data.statistics.innings.forEach((innings, index) => {
      // Store Inning wise data
      this.inningWiseCommentry[index] = {
        inning: innings.number,
        commentry: []
      };

      // Get all the data for this inning
      let currentInningCommentry = this.data.timeline.filter(
        commentry => commentry.inning == innings.number
      );

      //for loop of overs_completd in inning
      if (typeof innings.overs == "undefined" || innings.overs.length <= 0) {
        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        // console.log(this.inningWiseCommentry[0].commentry)
        if (this.inningWiseCommentry[0].commentry.length <= 0)
          this.inningWiseCommentry[0].commentry[0] = {};

        let temp = [];
        temp.unshift(this.data.timeline);
        this.inningWiseCommentry[0].commentry.unshift({ data: temp, overs: 0 });
        return false;

        return false;
      }
      innings.overs.forEach((over, inningIndex) => {
        // get first index of this innings over
        let firstOverIndex = currentInningCommentry.findIndex(
          commentry =>
            commentry.over_number == over.number &&
            commentry.inning == innings.number
        );

        // get last index of innings over
        let nextOver = over.number + 1;
        let lastOverIndex = currentInningCommentry.findIndex(
          commentry =>
            commentry.over_number == nextOver &&
            commentry.inning == innings.number
        );

        // Single Over commentry of Inning - get commentry of current overs to Next Over
        // console.log("lastOverIndex", lastOverIndex);
        // console.log("firstOverIndex", firstOverIndex);
        let overCommentry = [];
        if (innings.number == 1 && over.number == 1)
          overCommentry = currentInningCommentry.slice(0, lastOverIndex);
        else if (lastOverIndex > 0)
          overCommentry = currentInningCommentry.slice(
            firstOverIndex,
            lastOverIndex
          );
        else if (firstOverIndex > 0) {
          // console.log("else if");
          let lastOverIndex = currentInningCommentry.findIndex(
            commentry =>
              commentry.type == "match_ended" ||
              commentry.type == "close_of_play"
          );

          // console.log("lastOverIndex", lastOverIndex);
          // console.log("firstOverIndex", firstOverIndex);
          if (lastOverIndex > 0)
            overCommentry = currentInningCommentry.slice(
              firstOverIndex,
              lastOverIndex
            );
          else overCommentry = currentInningCommentry.slice(firstOverIndex);
        }
        /** Display Over Display Score */
        let overDisplayScore = [];
        if (overCommentry.length > 0) {
          let tempCommentry = overCommentry
            .reverse()
            .filter(comm => typeof comm.batting_params != "undefined");
          overDisplayScore =
            typeof tempCommentry != "undefined" && tempCommentry.length > 0
              ? tempCommentry[0].display_score
              : 0;
        }
        // Store over wise commentry and over stats
        this.inningWiseCommentry[index].commentry.push({
          stats: {
            over_number: typeof over.number != "undefined" ? over.number : 0,
            runs: typeof over.runs != "undefined" ? over.runs : 0,
            wickets: typeof over.wickets != "undefined" ? over.wickets : 0,
            abbreviation: this.getAbbreviation(innings.batting_team),
            display_score: overDisplayScore
          },
          data: overCommentry,
          overs: over.number
        });
      });
      // Reverse over commentry
      this.inningWiseCommentry[index].commentry = this.inningWiseCommentry[
        index
      ].commentry.reverse();
    });

    // If there is no any commentry - Do not show commentry
    if (this.inningWiseCommentry.filter(comm => comm.length > 0)) {
      this.showCommetry = true;

      // Add Close of play at last
      let temp = this.data.timeline.filter(
        commentry => commentry.type == "close_of_play"
      );
      this.inningWiseCommentry[
        this.inningWiseCommentry.length - 1
      ].commentry.unshift({ data: temp });
    }

    if (this.data.sport_event_status.status == "live") {
      this.getCurrentOverSummery();
      this.getCurrentPlayers();
    }

    this.getTossDecision();

    // Reverse inning
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    console.log("this.inningWiseCommentry");
    console.log(this.inningWiseCommentry);
  }

  /** Get Live Commentries inning wise*/
  getUpdate() {
    this.getTossDecision();

    this.data.timeline.forEach((timeline, index) => {
      // console.log(timeline);
      // console.log(index);

      // When inning is not yet started
      // console.log(typeof this.data.statistics == 'undefined' || typeof this.data.statistics.innings == 'undefined');

      if (
        typeof this.data.statistics == "undefined" ||
        typeof this.data.statistics.innings == "undefined"
      ) {
        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        this.inningWiseCommentry[0].commentry[0].data.unshift(timeline);
        return false;
      }

      // Get Innings data of current inning
      let currentInning = this.data.statistics.innings.filter(
        stats => stats.number == timeline.inning
      );
      // console.log("currentInning" , currentInning);
      let currentInningOver = [];
      if (
        currentInning.length > 0 &&
        typeof currentInning[0].overs != "undefined"
      ) {
        currentInningOver = currentInning[0].overs.filter(
          overs => overs.number == timeline.over_number
        );
        // console.log("currentInningOver" , currentInningOver);
      }
      // This ball statistics
      let timelineStats = {
        over_number:
          currentInningOver.length > 0 ? currentInningOver[0].number : 0,
        runs:
          currentInningOver.length > 0 &&
          typeof currentInningOver[0].runs != "undefined"
            ? currentInningOver[0].runs
            : 0,
        wickets:
          currentInningOver.length > 0 &&
          typeof currentInningOver[0].wickets != "undefined"
            ? currentInningOver[0].wickets
            : 0,
        abbreviation:
          currentInning.length > 0
            ? this.getAbbreviation(currentInning[0].batting_team)
            : "",
        display_score:
          typeof timeline.display_score != "undefined"
            ? timeline.display_score
            : 0
      };

      this.inningWiseCommentry[timeline.inning];
      // console.log(this.inningWiseCommentry[timeline.inning]);

      // find index of current Inning
      let currentInningIndex = this.inningWiseCommentry.findIndex(
        innings => innings.inning == timeline.inning
      );
      // console.log("currentInningIndex", currentInningIndex);

      // Check if current inning is already exists in Array
      if (
        currentInningIndex >= 0 &&
        typeof timeline.over_number != "undefined"
      ) {
        // Find Index of current Over in current Inning
        let currentOverIndex = this.inningWiseCommentry[
          currentInningIndex
        ].commentry.findIndex(overs => overs.overs == timeline.over_number);
        // console.log("currentOverIndex", currentOverIndex);

        // current Over summery
        let thisBallStats = {
          over: timeline.over_number,
          run:
            typeof timeline.batting_params != "undefined"
              ? timeline.batting_params.runs_scored
              : 0,
          wickets: timeline.type == "wicket" ? "W" : "",
          ball: timeline.ball_number,
          extra_runs:
            typeof timeline.bowling_params.extra_runs_conceded != "undefined"
              ? timeline.bowling_params.extra_runs_type
              : 0
        };
        // Check if current over is already exists in innings Array
        if (currentOverIndex >= 0) {
          // Find Index of current Ball in current over in current Inning
          // console.log( this.inningWiseCommentry[currentInningIndex].commentry[currentOverIndex].data)
          let currentBallIndex;
          if (
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].data.length > 0
          )
            currentBallIndex = this.inningWiseCommentry[
              currentInningIndex
            ].commentry[currentOverIndex].data.findIndex(
              data => timeline.ball_number == data.ball_number
            );
          else currentBallIndex = 0;
          // console.log("currentBallIndex" , currentBallIndex);

          // Check if current ball is already exists in over of innings Array
          if (currentBallIndex < 0) {
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].data.unshift(timeline);
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].stats = timelineStats;
            this.LiveOverSummery.push(thisBallStats);
          }
          else{
            // update commentry if already exists
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].data[currentBallIndex] = timeline;
          }
        } else {
          let temp = [];
          temp.unshift(timeline);
          let currentStats = timelineStats;
          this.LiveOverSummery = [];
          this.LiveOverSummery.push(thisBallStats);

          this.inningWiseCommentry[currentInningIndex].commentry.unshift({
            overs: timeline.over_number,
            data: temp,
            stats: currentStats
          });
        }
      } else {
        // TODO - Create array of current Innings
        // console.log("else");
        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        if (this.data.sport_event_status.current_inning)
          this.inningWiseCommentry[0].inning = this.data.sport_event_status.current_inning;

        // console.log(timeline)
        // console.log(this.inningWiseCommentry[0].commentry.length, this.inningWiseCommentry[0].commentry.length <= 0);

        if (this.inningWiseCommentry[0].commentry.length <= 0) {
          let temp = [];
          temp.unshift(timeline);
          this.inningWiseCommentry[0].commentry[0] = { data: temp };
        } else {
          let isExist = false;
          let lengthComm = this.inningWiseCommentry[0].commentry.length - 1;
          this.inningWiseCommentry[0].commentry.forEach(element => {
            element.data.forEach(ele => {
              if (ele.id == timeline.id) isExist = true;
            });
          });
          if (!isExist)
            this.inningWiseCommentry[0].commentry[0].data.unshift(timeline);
        }
      }

      // console.log("************************");
      // console.log(this.inningWiseCommentry);
      // Get current batsman and ballers
    });
    console.log(
      "************************this.inningWiseCommentry************************"
    );
    console.log(this.inningWiseCommentry);
    console.log(this.LiveOverSummery);

    this.getCurrentPlayers();

    if (this.inningWiseCommentry.filter(comm => comm.length > 0))
      this.showCommetry = true;

    // Stop live update if Match is ended
    if (this.data.sport_event_status.status == "ended") {
      this.clearTimeInterval();
      return false;
    }
  }

  /** Get Live scores in match detail header */
  getScores() {
    let compObj = {};
    this.data.sport_event.competitors.map(s => (compObj[s.qualifier] = s));
    if (this.data.sport_event_status.period_scores) {
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
    this.competitor = compObj;
    console.log(this.competitor);
  }

  /** Get current Batsman and Ballers */
  getCurrentPlayers() {

    let currentInningIndex = this.data.statistics.innings.findIndex((inning) => inning.number == this.data.sport_event_status.current_inning);

    let batsmanList = this.data.statistics.innings[currentInningIndex].teams.filter(
      players => players.statistics.batting
    )
    batsmanList = (typeof batsmanList[0] != 'undefined') ? batsmanList[0].statistics.batting.players : [];
  
    let ballerList = this.data.statistics.innings[currentInningIndex].teams.filter(
      players => players.statistics.bowling
    );
    ballerList = (typeof ballerList[0] != 'undefined') ? ballerList[0].statistics.bowling.players : [];
    
    if(this.data.timeline && this.data.timeline.length > 0){
      let timeline = this.data.timeline[this.data.timeline.length - 1];
      if(typeof this.batsmanList == 'undefined')
        this.batsmanList = [];
      if(timeline.batting_params && timeline.batting_params.striker){
        this.batsmanList[0] = timeline.batting_params.striker
        let stats = batsmanList.filter((player) => player.id == timeline.batting_params.striker.id)
        this.batsmanList[0].statistics = stats[0].statistics
      }
      if(timeline.batting_params && timeline.batting_params.non_striker){
        this.batsmanList[1] = timeline.batting_params.non_striker
        let stats = batsmanList.filter((player) => player.id == timeline.batting_params.non_striker.id)
        this.batsmanList[1].statistics = stats[0].statistics
      }
      console.log(this.batsmanList)

      if(typeof this.ballerList == 'undefined')
        this.ballerList = [];
      if(timeline.bowling_params && timeline.bowling_params.bowler){
        this.ballerList[0] = timeline.bowling_params.bowler
        let stats = ballerList.filter((player) => player.id == timeline.bowling_params.bowler.id)
        this.ballerList[0].statistics = stats[0].statistics
      }
      if(timeline.bowling_params && timeline.bowling_params.other_bowler){
        this.ballerList[1] = timeline.bowling_params.other_bowler
        let stats = ballerList.filter((player) => player.id == timeline.bowling_params.other_bowler.id)
        this.ballerList[1].statistics = stats[0].statistics
      }
      console.log(this.batsmanList)
    }


  }

  /** Get Match Live Update */
  getLiveUpdate(classThis) {
    console.log("getLiveUpdate");
    this.interval = setInterval(() => {
      //TEMP
      classThis.sportsService
        .getmatchtimelineDetla(classThis.data.sport_event.id)
        .subscribe(res => {
          // res = res.result; // TEMP
          this.data = res.data;
          this.matchdata = res.data;
          
          this.getTossDecision();

          // If no live coverage then no need to call API again
          if (
            typeof res.data.coverage_info != "undefined" &&
            res.data.coverage_info.live_coverage == false
          ) {
            this.clearTimeInterval();
          }

          // Update Commnetry and scores
          if (res.data.timeline && res.data.timeline.length > 0) {
            this.data = res.data;
            this.getUpdate();
            this.getScores();
          }
        });
    }, classThis.commonService.miliseconds(0, 0, 10)); // TEMP
  }

  /** Start Live Update after specific time - If match will start within 5 hours  */
  startLiveUpdateAfterTime() {
    console.log("startLiveUpdateAfterTime");
    let remainingTime = this.commonService.getRemainigTimeofMatch(
      this.data.sport_event.scheduled
    );
    let remainingMiliSec = this.commonService.miliseconds(
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
    remainingMiliSec =
      remainingMiliSec - this.commonService.miliseconds(0, 45, 0); // TEMP // Start timer before 30 min of match start
    if (remainingTime.days == 0 && remainingTime.hours < 5) {
      this.timeout = setTimeout(() => {
        this.getLiveUpdate(this);
      }, remainingMiliSec);
    }
  }

  /** Get Abbreviation from competitor ID */
  getAbbreviation(id) {
    let competitor = this.data.sport_event.competitors.filter(
      competitor => competitor.id == id
    );
    return competitor[0].abbreviation;
  }

  /** Clear Interval and timeout on destroy */
  clearTimeInterval() {
    console.log("clearTimeInterval");
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }
}
