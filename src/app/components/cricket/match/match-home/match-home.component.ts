import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../../providers/sports-service";
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
  lastmatches: any;
  matchesresultdata: any;
  venuedetails: any;
  manofthematch: any;
  scorecards: any;
  teams: { id: string; data: any; }[];
  teamsbytype: { qualifier: string; data: any; }[];
  matcheventstatus: any;
  battingteam1 = []
  battingteam2 = []
  bowlingteam1 = [];
  bowlingteam2 = [];
  objnew = {}
  objnew2 = {}
  venuelat: any;
  venuelong: any;
  matchprobability: any;
  matchdata: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private router: Router
  ) {
    this.matchid = atob(this.activatedroute.snapshot.params.id);
    this.activatedroute.params.subscribe(params => {
      // if (params.categoryId != Id) {

      this.matchid = atob(params.id);
      if(this.matchid){
        this.getMatchTimeline();
      }
     // this.getMatchTimeline();
      // }
    });
  }

  ngOnInit() {
    this.getMatchTimeline();
  }

  //get matchtimeline
  getMatchTimeline() {
    this.sportsService.getmatchtimeline(this.matchid).subscribe(res => {
      if (res["data"]) {
        this.matchdata = res['data'];
        console.log('data',res["data"]);
        this.matchstatus = res["data"]["sport_event_status"].status;
        this.sportevent = res["data"]["sport_event"];
        this.venuedetails = res["data"]["sport_event"]["venue"];
        if(this.venuedetails.map_coordinates){
        let cordinates = this.venuedetails.map_coordinates.split(',');
        this.venuelat = Number(cordinates[0])
        this.venuelong = Number(cordinates[1])
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
        
        this.teams = Object.keys(obj).map(id => ({ id, data: obj[id] }))  
        let team_arr2 = []
        let obj2 = {}
        team_arr2 = res["data"]["sport_event"]["competitors"];
        team_arr2.map(single => {
          if (!obj2[single.qualifier]) {
            obj2[single.qualifier] = [];
          }
        });
        team_arr2.map(data => {
          obj2[data.qualifier].push(data);
        });

        this.teamsbytype = Object.keys(obj2).map(qualifier => ({ qualifier, data: obj2[qualifier] }))

        this.team1id = res["data"]["sport_event"]["competitors"][0].id;
        this.team2id = res["data"]["sport_event"]["competitors"][1].id;
        if (this.team1id && this.team2id) {
          this.getTeamvsTeamdata(); //to get team vs team data
        }

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
        } 
        else if (this.matchstatus == "closed") {
          this.manofthematch = res["data"]["statistics"]["man_of_the_match"];
          this.matcheventstatus = res["data"]["sport_event_status"];   
          this.scorecards = res["data"]["statistics"]["innings"];
      
          this.scorecards.map((data)=>{ 
            if(data.batting_team == this.teams[0].data[0].id){
                this.battingteam1.push(data)
            }
            else if(data.batting_team == this.teams[1].data[0].id){
              this.battingteam2.push(data)
            }
            if(data.bowling_team == this.teams[0].data[0].id){ 
              this.bowlingteam1.push(data)
            }
            else if(data.bowling_team == this.teams[1].data[0].id){
              this.bowlingteam2.push(data)
            }
          })

          this.battingteam1 = this.battingteam1[0]['teams'][0]['statistics']['batting']
          this.battingteam2 = this.battingteam2[0]['teams'][0]['statistics']['batting']
          this.bowlingteam1 = this.bowlingteam1[0]['teams'][1]['statistics']['bowling']
          this.bowlingteam2 = this.bowlingteam2[0]['teams'][1]['statistics']['bowling']

          let arrnew = []
          arrnew = this.battingteam2["players"]
          arrnew.map(single => {
            if (!this.objnew[single.id]) {
              this.objnew[single.id] = [];
            }
          });
          arrnew.map(data => {
            this.objnew[data.id].push(data);
          });
          //map array for team 2 bowlers name

          let playerarr = []
          playerarr = this.battingteam1["players"]
          playerarr.map(single => {
            if (!this.objnew2[single.id]) {
              this.objnew2[single.id] = [];
            }
          });
          playerarr.map(data => {
            this.objnew2[data.id].push(data);
          });

      
        }
      }
    },
    (error)=>{
      if(error['error'].status == 400){
        this.router.navigate(['/page-not-found'])
      }
  });
  }

  //get match probablities

  getMatchProbability() {
    this.sportsService.getmatchprobability(this.matchid).subscribe(res => {
      this.matchprobability = res['data']
      
    });
  }

  //get match related articles
  getarticles() {
    this.commonnewsparams = {
      eSport: "Cricket",
      nStart:0,
      nLimit:4,
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


  getTeam1playername(id){    
    this.battingteam2['players'].map((data)=>{
        if(id === data.id){
          console.log(data.name);
          return data.name
        }
    })
  }


}
