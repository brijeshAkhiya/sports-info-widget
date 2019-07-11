import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";
import * as moment from "moment";
import { Title } from '@angular/platform-browser';
@Component({
  selector: "app-match-home",
  templateUrl: "./match-home.component.html",
  styleUrls: ["./match-home.component.css"]
})
export class MatchHomeComponent implements OnInit {
  paramArticle = { reqParams: { nStart: 0, nLimit: 10, aIds: [] } }
  matchid: any;
  matchstatus: any;
  sportevent: any;
  hours: any;
  minutes: any;
  seconds: any;
  team1id: any;
  team2id: any;
  nextmatches: any[];
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
  dummyAPICall = 450;
  fallofWickets = [];
  playerList = {};
  scorecardinnings: any;
  matchInnings = [];
  objectKeys = Object.keys
  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private router: Router,
    private title: Title,
    private cricketService: CricketService,
    private commonService: CommonService
  ) {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.matchid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'cricket', 'match')
    this.paramArticle.reqParams.aIds.push(this.matchid);
    this.activatedroute.params.subscribe(params => {
      this.matchid = this.commonService.getIds(params.id, 'cricket', 'match')
      if (this.matchid) {
        // this.getMatchTimeline();
        this.getMatchData();
      }
    });
  }

  ngOnInit() {
    var classThis = this;
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    }
    else if (typeof document['msHidden'] !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document['webkitHidden'] !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
      console.log('visiblity changed', document.hidden)
      console.log('visiblity hasfocus', document.hasFocus())
      // if (document.hidden)
      //   classThis.clearTimeInterval()
      // else {
      //   classThis.getMatchData();
      // }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
      alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

  }
  initData() {
    this.LiveOverSummery = [];
  }

  checkYetBat(players) {
    let check = players.filter((player) => player.statistics.length == 0)
    if (check.length > 0)
      return true;
    return false;
  }
  /** Get Match Data */
  getMatchData() {
    // this.sportsService.getmatchtimelineDetlaDirect(this.matchid).subscribe((res:any)=>{
    //   console.log('scorecard::',res);
    // })
    console.log('matchid::', this.matchid);

    this.sportsService.getmatchtimeline(this.matchid).subscribe(
      (res: any) => {

        this.initData();
        //res = res.result;
        this.isshow = true;
        if (res.data) {
          console.log(res.data);
          this.isshow = false;
          this.matchdata = res.data;
          this.matchInnings = (res.data.statistics) ? res.data.statistics.innings : [];
          //this.getScorecards(this.matchdata.statistics.innings)
          this.data = res.data;
          this.getTeams();
          this.getmatchteamlineup();
          this.getCommentries();
          this.getFallWickets();
          this.getScores();
          this.getTossDecision();
          if (this.matchdata.sport_event_status.status == "not_started") {
            this.startLiveUpdateAfterTime();
          }
          if (this.matchdata.sport_event_status.status == "live" || this.matchdata.sport_event_status.status == "interrupted" || this.matchdata.sport_event_status.status == "delayed") {
            this.getLiveUpdate(this);
          }

          this.setTitle();

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

  //get scorecards 
  getScorecards(matchdata) {
    this.scorecardinnings = matchdata
    console.log('scoreinnigs::::', this.scorecardinnings);
    this.scorecardinnings.forEach(element => {

    });

  }


  /** GET TEAMS */
  getTeams() {
    if (this.matchdata.sport_event.competitors) {
      this.getTeamvsTeamdata(); //to get team vs team data
      this.matchdata.sport_event.competitors.forEach(element => {
        this.teamObj[element.id] = element;

        if (this.competitor && !this.competitor[element.qualifier])
          this.competitor[element.qualifier] = [];
        this.competitor[element.qualifier] = element;
      });
    }
    console.log('this.teamObj');
    console.log(this.teamObj);
  }

  /** Get Fall of Wickets */
  getFallWickets() {
    if (this.matchdata.timeline) {
      let arrWickets = this.matchdata.timeline.filter((timeline) => timeline.type == "wicket")

      if (arrWickets.length > 0) {
        arrWickets.reverse().map(data => {
          if (!this.fallofWickets[data.inning])
            this.fallofWickets[data.inning] = [];

          let find = this.fallofWickets[data.inning].filter((wicket) => wicket.playerid == data.dismissal_params.player.id)
          if (find.length == 0) {
            this.fallofWickets[data.inning].push({
              playerid: data.dismissal_params.player.id,
              playername: data.dismissal_params.player.name,
              displayover: data.display_overs,
              displayscore: data.display_score
            });
          }
        });

      }


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
            console.log("scorecards", this.scorecards);
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
          if (res.data && res.data.lineups[0].starting_lineup && res.data.lineups[1].starting_lineup) {
            let players = []
            res.data.lineups[0].starting_lineup.map(s => {
              players.push({ ...s, team_type: res.data.lineups[0].team })
            })
            res.data.lineups[1].starting_lineup.map(s => {
              players.push({ ...s, team_type: res.data.lineups[1].team })
            })
            players.map(single => {
              if (!this.playerList[single.id]) {
                this.playerList[single.id] = single
              }
            });
            console.log('playerslistt::', this.playerList);
          }
          else {
            this.getPlayersname();
          }
        },
        error => {
          if (error) {
            this.getPlayersname();
          }
        }
      );
    }
  }

  //getPlayersname if lineup data api doesn't provide players data
  getPlayersname() {
    this.sportsService.getmatchtimeline(this.matchid).subscribe(res => {
      if (res["data"]["statistics"] && res["data"]["statistics"]["innings"]) {
        this.scorecards = res["data"]["statistics"]["innings"];
        let objBatting = [];
        let objBowling = {};
        //old logic for get players name
        this.scorecards.map((data, key) => {
          data["teams"][0]["statistics"]["batting"]["players"].map(
            single => {
              objBatting[single.id] = single
            }
          );
        });
        // players name object
        this.playerList = {
          ...objBowling,
          ...objBatting
        };
        console.log("playerList:::", this.playerList);
      }
    });
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
          if (res.data.next_meetings && res.data.next_meetings.length > 0)
            this.nextmatches = this.commonService.sortArr(res.data.next_meetings, 'Do MMMM YYYY', 'scheduled', 'asc');

          if (res.data.last_meetings && res.data.last_meetings.length > 0) {
            let last_meetings = res.data.last_meetings.filter((match) => match.period_scores);
            this.matchesresultdata = this.cricketService.initCompetitorScore(last_meetings)
            this.matchesresultdata = this.commonService.sortArr(this.matchesresultdata, 'Do MMMM YYYY', 'scheduled', 'desc');
          }
        }
      });
  }

  //get match detail
  matchDetail(id, team1, team2) {
    let teams = team1.concat("-", team2);
    this.router.navigate(["/cricket/match", btoa(id), teams]);
  }

  /** Get Toss decision */
  getTossDecision() {
    console.log("getTossDecision", Object.entries(this.tossdecision).length);

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

      console.log("toss decision", this.tossdecision);
    }
  }

  /** Check if there is no commentry from API */
  checkCommentry() {
    if (!this.data.timeline) return [];
    return this.data.timeline.filter(timeline => {
      return timeline.commentaries;
    });
  }

  getCurrentOverSummery() {
    console.log("getCurrentOverSummery");

    let currentInning: any = this.inningWiseCommentry.filter(innings => {
      return innings.inning == this.data.sport_event_status.current_inning;
    });
    // let currentOver = currentInning[0].commentry.filter(overData => {
    //   return (
    //     overData.overs ==
    //     Math.floor(this.data.sport_event_status.display_overs) + 1
    //   );
    // });
    let temp = currentInning[0].commentry;
    let currentOver = temp.findIndex(
      overData => { console.log(overData); return overData.data.length > 0 }
    );

    if (currentOver > -1) {
      currentInning[0].commentry[currentOver].data.forEach(element => {
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

    // check if commentry exists
    console.log(this.checkCommentry().length);
    if (this.checkCommentry().length <= 0) {
      this.showCommetry = false;
      return false;
    }
    let timelineWithCommentry = this.data.timeline.filter((commentry) => { return commentry.commentaries });

    console.log(this.data.timeline.length > 0, this.data.sport_event_status.current_inning == 1, this.data.sport_event_status.display_overs == 0)
    if (this.data.timeline.length > 0 && this.data.sport_event_status.current_inning == 1 && this.data.sport_event_status.display_overs == 0) {
      this.inningWiseCommentry[0] = { commentry: [], inning: 1 };
      let temp = [];
      temp.unshift(this.data.timeline);
      this.inningWiseCommentry[0].commentry.unshift({ data: timelineWithCommentry.reverse(), overs: 1 });
      console.log(this.inningWiseCommentry);
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
      let currentInningCommentry = timelineWithCommentry.filter(
        commentry => commentry.inning == innings.number
      );

      // If overs is not yet started
      if (typeof innings.overs == "undefined" || innings.overs.length <= 0) {
        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        if (this.inningWiseCommentry[0].commentry.length <= 0)
          this.inningWiseCommentry[0].commentry[0] = {};

        let temp = [];
        temp.unshift(timelineWithCommentry);
        this.inningWiseCommentry[0].commentry.unshift({ data: temp, overs: 1 });
        return false;
      }

      //for loop of overs_completd in inning
      let firstIndex = 0;
      let lastIndex = 0;
      innings.overs.forEach((over, inningIndex) => {

        // get last index of innings over
        let nextOver = over.number + 1;
        let lastIndex = currentInningCommentry.findIndex(
          commentry =>
            commentry.over_number == nextOver &&
            commentry.inning == innings.number
        );
        // Next over if commentry type is change_of_bowler
        let matchedIndex = currentInningCommentry.map(function (obj, i) { return i > firstIndex && obj.type; }).indexOf('change_of_bowler');
        if (matchedIndex > -1) {
          if (lastIndex > matchedIndex)
            lastIndex = matchedIndex;
        }
        let overCommentry = [];
        if (lastIndex > 0) {
          overCommentry = currentInningCommentry.slice(
            firstIndex,
            lastIndex
          );
          firstIndex = lastIndex;
        }
        else if (firstIndex > 0) {
          let lastIndex = currentInningCommentry.findIndex(
            commentry =>
              commentry.type == "match_ended" ||
              commentry.type == "close_of_play"
          );
          if (lastIndex > 0)
            overCommentry = currentInningCommentry.slice(
              firstIndex,
              lastIndex
            );
          else overCommentry = currentInningCommentry.slice(firstIndex);
        } else
          overCommentry = currentInningCommentry.slice(firstIndex);

        console.log(overCommentry)
        // // get first index of this innings over
        // let firstOverIndex = currentInningCommentry.findIndex(
        //   commentry =>
        //     commentry.over_number == over.number &&
        //     commentry.inning == innings.number
        // );

        // get last index of innings over
        // let nextOver = over.number + 1;
        // let lastOverIndex = currentInningCommentry.findIndex(
        //   commentry =>
        //     commentry.over_number == nextOver &&
        //     commentry.inning == innings.number
        // );

        // Single Over commentry of Inning - get commentry of current overs to Next Over
        // console.log("lastOverIndex", lastOverIndex);
        // console.log("firstOverIndex", firstOverIndex);
        // let overCommentry = [];
        // if (innings.number == 1 && over.number == 1)
        //   overCommentry = currentInningCommentry.slice(0, lastOverIndex);
        // else if (lastOverIndex > 0)
        //   overCommentry = currentInningCommentry.slice(
        //     firstOverIndex,
        //     lastOverIndex
        //   );
        // else if (firstOverIndex > 0) {
        //   let lastOverIndex = currentInningCommentry.findIndex(
        //     commentry =>
        //       commentry.type == "match_ended" ||
        //       commentry.type == "close_of_play"
        //   );
        //   if (lastOverIndex > 0)
        //     overCommentry = currentInningCommentry.slice(
        //       firstOverIndex,
        //       lastOverIndex
        //     );
        //   else overCommentry = currentInningCommentry.slice(firstOverIndex);
        // }

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

    // if (this.data.sport_event_status.status == "live") {
    this.getCurrentOverSummery();
    this.getCurrentPlayers();
    // }

    this.getTossDecision();

    // Reverse inning
    this.inningWiseCommentry = this.inningWiseCommentry.reverse();
    console.log("this.inningWiseCommentry");
    console.log(this.inningWiseCommentry);
  }

  /** Get Live Commentries inning wise*/
  getUpdate() {
    this.getTossDecision();

    let timelineWithCommentry = this.data.timeline.filter((commentry) => { return commentry.commentaries });

    timelineWithCommentry.forEach((timeline, index) => {

      if (timeline.type == 'wicket')
        this.getFallWickets();

      // When inning is not yet started
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

      // find index of current Inning
      let currentInningIndex = this.inningWiseCommentry.findIndex(
        innings => innings.inning == timeline.inning
      );

      // Check if current inning is already exists in Array
      if (
        currentInningIndex >= 0 &&
        typeof timeline.over_number != "undefined"
      ) {

        // Find Index of current Over in current Inning
        let currentOverIndex = this.inningWiseCommentry[
          currentInningIndex
        ].commentry.findIndex(overs => overs.overs == timeline.over_number);

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

          // Check if current ball is already exists in over of innings Array
          if (currentBallIndex < 0) {
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].data.unshift(timeline);
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].stats = timelineStats;
            this.LiveOverSummery.push(thisBallStats);
          } else {
            // update commentry if already exists
            this.inningWiseCommentry[currentInningIndex].commentry[
              currentOverIndex
            ].data[currentBallIndex] = timeline;
          }
        } else {
          //create current over in innings if not exists
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
        //Create array of current Innings
        if (typeof this.inningWiseCommentry[0] == "undefined")
          this.inningWiseCommentry[0] = { commentry: [] };

        if (this.data.sport_event_status.current_inning)
          this.inningWiseCommentry[0].inning = this.data.sport_event_status.current_inning;

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
      this.interval = setInterval(() => {
        this.clearTimeInterval();
        return false;
      }, this.commonService.miliseconds(0, 15, 0)); // stop live update after 15 min of match completed 
    }
  }

  /** Get Live scores in match detail header */
  getScores() {
    let compObj = {};
    if (this.data.sport_event.competitors)
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
    console.log("getCurrentPlayers");

    let currentInningIndex = this.data.statistics.innings.findIndex((inning) => inning.number == this.data.sport_event_status.current_inning);

    let batsmanList = this.data.statistics.innings[currentInningIndex].teams.filter(
      players => players.statistics.batting
    )
    batsmanList = (typeof batsmanList[0] != 'undefined') ? batsmanList[0].statistics.batting.players : [];

    let ballerList = this.data.statistics.innings[currentInningIndex].teams.filter(
      players => players.statistics.bowling
    );
    ballerList = (typeof ballerList[0] != 'undefined') ? ballerList[0].statistics.bowling.players : [];

    if (this.data.timeline && this.data.timeline.length > 0) {
      let temp = this.data.timeline;
      let timeline = temp.reverse().findIndex(
        overData => { return overData.batting_params }
      );
      console.log(timeline);
      if (timeline == -1)
        return;
      timeline = temp[timeline];
      if (typeof this.batsmanList == 'undefined')
        this.batsmanList = [];
      if (timeline.batting_params && timeline.batting_params.striker) {
        this.batsmanList[0] = timeline.batting_params.striker
        let stats = batsmanList.filter((player) => player.id == timeline.batting_params.striker.id)
        this.batsmanList[0].statistics = stats[0].statistics
      }
      if (timeline.batting_params && timeline.batting_params.non_striker) {
        this.batsmanList[1] = timeline.batting_params.non_striker;
        let stats = batsmanList.filter(
          player => player.id == timeline.batting_params.non_striker.id
        );
        this.batsmanList[1].statistics = stats[0].statistics;
      }
      console.log("batsmanList", this.batsmanList);
      /** Remove dismissal */
      if (timeline.dismissal_params)
        this.batsmanList = this.batsmanList.filter((player) => player.id != timeline.dismissal_params.player.id)

      let prev_baller;
      if (typeof this.ballerList == "undefined") this.ballerList = [];
      if (timeline.bowling_params && timeline.bowling_params.bowler) {
        prev_baller = this.ballerList[0];
        this.ballerList[0] = timeline.bowling_params.bowler;
        let stats = ballerList.filter(
          player => player.id == timeline.bowling_params.bowler.id
        );
        this.ballerList[0].statistics = stats[0].statistics;
      }
      if (timeline.bowling_params && timeline.bowling_params.other_bowler) {
        this.ballerList[1] = timeline.bowling_params.other_bowler;
        let stats = ballerList.filter(
          player => player.id == timeline.bowling_params.other_bowler.id
        );
        this.ballerList[1].statistics = stats[0].statistics;
      }
      else if (typeof prev_baller != 'undefined' && (prev_baller.id != this.ballerList[0].id))
        this.ballerList[1] = prev_baller;
      // else
      //   this.ballerList.splice(1, 1);
      console.log(this.ballerList);
    }
  }

  /** Get Match Live Update */
  getLiveUpdate(classThis) {
    console.log("getLiveUpdate");
    this.interval = setInterval(() => {
      //TEMP
      this.dummyAPICall++;
      classThis.sportsService
        .getmatchtimelineDetla(classThis.data.sport_event.id)
        // .getmatchtimelineDetlaDirect(this.dummyAPICall)
        .subscribe(res => {
          // res = res.result; // TEMP
          this.data = res.data;
          this.matchdata = res.data;

          /** Update Scorecard */
          if (this.matchdata.statistics && this.matchdata.statistics.innings) {
            let inningIndex = this.matchInnings.findIndex((innings) => innings.number == this.data.sport_event_status.current_inning);
            let inning = this.matchdata.statistics.innings.filter((innings) => innings.number == this.data.sport_event_status.current_inning);
            if (inningIndex > -1 && inning.length > 0) {
              this.matchInnings[inningIndex].teams = inning[0].teams;
            }
            else {
              this.matchInnings.push(inning[0]);
            }
          }

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

          this.setTitle();


        });
    }, classThis.commonService.miliseconds(0, 0, 12)); // TEMP
  }

  /** Change page title */
  setTitle() {
    if (this.matchdata.sport_event_status.match_result)
      this.title.setTitle(this.matchdata.sport_event_status.match_result)
    //document.title = this.matchdata.sport_event_status.match_result;
    else if (this.matchdata.sport_event_status.current_inning >= 1) {
      let currentInning = this.matchdata.statistics.innings.filter((inning) => inning.number == this.matchdata.sport_event_status.current_inning);
      if (currentInning) {
        let currentTeamInning = currentInning[0].teams.filter((team) => team.id == currentInning[0].batting_team)
        // document.title = currentTeamInning[0].abbreviation +' ' +this.matchdata.sport_event_status.display_score + ' (' + this.matchdata.sport_event_status.display_overs + ' ov)';
        this.title.setTitle(currentTeamInning[0].abbreviation + ' ' + this.matchdata.sport_event_status.display_score + ' (' + this.matchdata.sport_event_status.display_overs + ' ov)')
      }
    }
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
      remainingMiliSec - this.commonService.miliseconds(0, 45, 0); // TEMP // Start timer before 45 min of match start
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

  checkNotBat() { }

  typeOf(value) {
    return typeof value;
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.clearTimeInterval();
  }
}
