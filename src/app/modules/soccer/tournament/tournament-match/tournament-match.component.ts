import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SportsService } from "@providers/sports-service";
import { CricketService } from "@providers/cricket-service";
import { CommonService } from "@providers/common-service";

@Component({
  selector: 'app-tournament-match',
  templateUrl: './tournament-match.component.html',
  styleUrls: ['./tournament-match.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TournamentMatchComponent implements OnInit {

  paramArticle = { reqParams: { nStart: 0, nLimit: 10, eSport: 'Soccer', aIds: [] } }
  loading: boolean = false;
  statsLoading: boolean = false;
  lineupLoading: boolean = false;
  matchInfo;
  matchLineups;
  commentry = [];
  team: any = {};
  // venuedetails = { lat: '', lng: '', name: '' };
  matchStats: any;
  info;
  // dummyAPICall = 62;
  interval;
  timeout;
  teamvsteamdata: any;
  headtohead;
  teamssummary: { team1: { info: any; matches: any[]; }; team2: { info: any; matches: any[]; }; };

  constructor(
    private sportsService: SportsService,
    public commonService: CommonService,
    public cricketService: CricketService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /**To reload router if routing in same page */
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    let matchid = this.commonService.getIds(this.activatedroute.snapshot.params.id, 'soccer', 'match');
    this.getMatchInfo(matchid)

    // this.getMatchstats(this.activatedroute.snapshot.params.id)
    this.paramArticle.reqParams.aIds.push(matchid);
  }

  getMatchInfo(id) {
    this.loading = true;
    this.sportsService.getSoccerMatchTimeline(id).subscribe((res: any) => {
      if (res.data) {
        this.matchInfo = res.data;
        console.log(this.matchInfo);
        this.getSoccerTeamvsTeam(this.matchInfo.sport_event.competitors)
        this.getTeamsSummumaries(this.matchInfo.sport_event.competitors)

        this.matchInfo.match_title = this.matchInfo.sport_event.competitors[0].name + ' ' + 'VS' + ' ' + this.matchInfo.sport_event.competitors[1].name;
        if (this.matchInfo.sport_event.venue) {
          this.matchInfo.venuedetails = this.matchInfo.sport_event.venue
          if (this.matchInfo.sport_event.venue.map_coordinates) {
            this.matchInfo.venuedetails.lat = parseFloat(this.matchInfo.sport_event.venue.map_coordinates.split(',')[0])
            this.matchInfo.venuedetails.lng = parseFloat(this.matchInfo.sport_event.venue.map_coordinates.split(',')[1])
          }
        }

        if (this.matchInfo.sport_event_status.status == 'upcoming') {
          this.startLiveUpdateAfterTime();
        } else if (this.matchInfo.sport_event_status.status == 'live' || this.matchInfo.sport_event_status.status == 'ended') {
          this.getLiveUpdate(this);
          if(res.data.timeline)
            this.initCommentry(res.data.timeline);
        }

        // this.getVenuedetails();
        this.initTeam();
        this.getMatchLineup(this.matchInfo.sport_event.id)
        // this.initCommentry();
        // this.initSquads();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  getMatchLineup(id) {
    console.log("getMatchLineup");
    this.lineupLoading = true;
    this.sportsService.getSoccerMatchLineup(id).subscribe((res: any) => {
      if (res.data) {
        this.matchLineups = res.data;
        console.log(this.matchLineups);
        // if (this.matchInfo.match_info.gamestate == 0) {
        //   this.startLiveUpdateAfterTime();
        // }else if (this.matchInfo.match_info.status == 3)
        //   this.getLiveUpdate(this);

        // this.getVenuedetails();
        // this.initTeam();
        // this.initCommentry();
        // if(Object.entries(this.matchLineups.lineups).length > 0)
        this.initSquads();
      }
      this.lineupLoading = false;
    }, (error) => {
      this.lineupLoading = false;
    });
  }


  getMatchstats(id) {
    this.statsLoading = true;
    this.sportsService.getSoccerMatchTimeline(id).subscribe((res: any) => {
      this.statsLoading = false;
      if (res.data && res.data.statistics) {
        this.team.home.statistics = res.data.statistics.totals.competitors.filter((comp) => comp.qualifier == 'home')[0].statistics
        this.team.away.statistics = res.data.statistics.totals.competitors.filter((comp) => comp.qualifier == 'away')[0].statistics
        this.matchStats = res.data.statistics;
      }
    }, (error) => {
      this.statsLoading = false;
    });
  }

  //get team vs team data 
  getSoccerTeamvsTeam(teams) {
    let head = { teams: { team1: { id: teams[0].id, name: teams[0].name, total: 0 }, team2: { id: teams[1].id, name: teams[1].name, total: 0 } }, draw: 0, totalmatches: 0 }
    this.sportsService.getsoccerteamvsteamdata(teams[0].id, teams[1].id).subscribe((res: any) => {
      this.teamvsteamdata = res.data.last_meetings ? res.data.last_meetings : []
      this.teamvsteamdata.map((match) => {
        head.totalmatches += 1
        if (match.sport_event_status.winner_id) {
          if (head.teams.team1.id == match.sport_event_status.winner_id) {
            head.teams.team1.total += 1
          }
          else {
            head.teams.team2.total += 1
          }
        }
        else {
          head.draw += 1
        }
      })
      this.headtohead = head
      this.teamvsteamdata = this.commonService.sortArr(this.teamvsteamdata, 'Do MMMM YYYY', 'start_time', 'desc')
    })
  }


  getTeamsSummumaries(teams) {
    let teamssummary = { team1: { info: teams[0], matches: [] }, team2: { info: teams[1], matches: [] } }

    this.sportsService.getsoccerteamsummaries(teams[0].id).subscribe((res: any) => {
      let team1data = res.data.summaries
      team1data = team1data.filter((match) => match.sport_event_status.status == 'closed')
      team1data = team1data.sort((a, b) => {
        return new Date(a['start_time']) < new Date(b['start_time']) ? -1 : new Date(a['start_time']) > new Date(b['start_time']) ? 1 : 0;
      })
      teamssummary.team1.matches = team1data.slice(0, 5)
      teamssummary.team1.matches.map((obj) => {
        obj.sport_event.competitors.map((comp) => {
          if (comp.id != teams[0].id) {
            obj['oppteamid'] = comp.id
            obj['oppteamname'] = comp.name
          }
        })
        if (obj.sport_event_status.winner_id == teams[0].id && obj.sport_event_status.winner_id) {
          obj['result'] = 'winner'
        }
        else if (!(obj.sport_event_status.winner_id == teams[0].id) && obj.sport_event_status.winner_id) {
          obj['result'] = 'loss'
        }
        else {
          obj['result'] = 'draw'
        }
      })
    })

    this.sportsService.getsoccerteamsummaries(teams[1].id).subscribe((res: any) => {
      let team2data = res.data.summaries
      team2data = team2data.filter((match) => match.sport_event_status.status == 'closed')
      team2data = team2data.sort((a, b) => {
        return new Date(a['start_time']) < new Date(b['start_time']) ? -1 : new Date(a['start_time']) > new Date(b['start_time']) ? 1 : 0;
      })
      teamssummary.team2.matches = team2data.slice(0, 5)
      teamssummary.team2.matches.map((obj) => {
        obj.sport_event.competitors.map((comp) => {
          if (comp.id != teams[1].id) {
            obj['oppteamid'] = comp.id
            obj['oppteamname'] = comp.name
          }
        })
        if (obj.sport_event_status.winner_id == teams[1].id && obj.sport_event_status.winner_id) {
          obj['result'] = 'winner'
        }
        else if (!(obj.sport_event_status.winner_id == teams[1].id) && obj.sport_event_status.winner_id) {
          obj['result'] = 'loss'
        }
        else {
          obj['result'] = 'draw'
        }
      })
    })

    this.teamssummary = teamssummary

    console.log('final::', teamssummary);


  }

  initTeam() {
    this.team.home = this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'home')[0];
    this.team.away = this.matchInfo.sport_event.competitors.filter((comp) => comp.qualifier == 'away')[0];
    console.log(this.team);

  }

  initSquads() {

    if (Object.entries(this.matchLineups.lineups).length > 0) {
      this.team.home = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0];
      this.team.away = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0];

      //Team with role
      let tempHomeSquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'home')[0].players;
      this.team.home.squad = []
      tempHomeSquad.forEach(element => {
        (this.team.home.squad[element.type] = this.team.home.squad[element.type] || []).push(element);
      });
      //Team with formated type
      if (this.team.home.formation && this.team.home.formation.type) {
        let players = this.sortingByRole(this.team.home.players);
        (this.team.home.formated_players = this.team.home.formated_players || []).push(players.splice(0, 1));
        this.team.home.formation.type.split('-').forEach((formationType, index) => {
          this.team.home.formated_players.push(players.splice(0, formationType));
        });
      }

      //Team with role
      let tempAwaySquad = this.matchLineups.lineups.competitors.filter((comp) => comp.qualifier == 'away')[0].players;
      this.team.away.squad = []
      tempAwaySquad.forEach(element => {
        (this.team.away.squad[element.type] = this.team.away.squad[element.type] || []).push(element);
      });
      //Team with formated type
      if (this.team.away.formation && this.team.away.formation.type) {
        let players = window['players'] = this.sortingByRole(this.team.away.players);
        (this.team.away.formated_players = this.team.away.formated_players || []).push(players.splice(0, 1));
        this.team.away.formation.type.split('-').forEach((formationType, index) => {
          this.team.away.formated_players.push(players.splice(0, formationType));
        });
      }
    }
    if (this.matchInfo.statistics && Object.entries(this.matchInfo.statistics).length > 0) {
      this.team.home.statistics = this.matchInfo.statistics.totals.competitors.filter((comp) => comp.qualifier == 'home')[0].statistics
      this.team.away.statistics = this.matchInfo.statistics.totals.competitors.filter((comp) => comp.qualifier == 'away')[0].statistics
      this.matchStats = this.matchInfo.statistics;
    }

    console.log(this.team);

  }

  getLiveUpdate(classThis) {
    console.log("getLiveUpdate");
    this.interval = setInterval(() => {
      //TEMP
      // this.dummyAPICall++;
      classThis.sportsService
        .getSoccerMatchTimeline(this.matchInfo.sport_event.id)
        // .getKabaddiDummyCall(this.dummyAPICall)
        .subscribe(res => {
          console.log(res);
          // let matchData = res.data.items; 
          // this.matchInfo = res.data.items;
          if (res.data.sport_event_status.status == 'live' || this.matchInfo.sport_event_status.status != res.data.sport_event_status.status) {
            // this.initTeam();
            // this.initSquads();
            // this.commentry = [];
            this.matchInfo.statistics = res.data.statistics;
            if(res.data.timeline)
            this.initCommentry(res.data.timeline);
          }
          // if(matchData.match_info.status == 2){
          //   this.commentry = [];
          //   this.initCommentry();
          //   this.clearTimeInterval();
          // }
        });
    }, classThis.commonService.miliseconds(0, 0, 8)); // TEMP

  }

  initCommentry(commentry) {
    console.log("initCommentry");
    commentry.forEach(element => {
      if (this.matchInfo.timeline.findIndex((timeline) => timeline.id == element.id) == -1)
        this.matchInfo.timeline.push(element)
    });
    //stoppage_time
    let tempTimeline: any = [...this.matchInfo.timeline];
    console.log(tempTimeline)
    tempTimeline = tempTimeline.splice(this.matchInfo.timeline.length - 1, 1)[0]
    console.log(tempTimeline)
    // tempTimeline = tempTimeline.pop();
    if (typeof tempTimeline.match_time != 'undefined') {
      if (typeof tempTimeline.stoppage_time != 'undefined')
        this.matchInfo.match_time = tempTimeline.match_time + " + " + tempTimeline.stoppage_time.toString();
      else
        this.matchInfo.match_time = tempTimeline.match_time;
    }
  }

  startLiveUpdateAfterTime() {

    console.log("startLiveUpdateAfterTime");
    let remainingTime = this.commonService.getRemainigTimeofMatch(
      this.matchInfo.match_info.datestart
    );
    console.log(remainingTime);

    let remainingMiliSec = this.commonService.miliseconds(
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
    remainingMiliSec =
      remainingMiliSec - this.commonService.miliseconds(0, 5, 0);
    if (remainingTime.days == 0 && remainingTime.hours < 5) {
      this.timeout = setTimeout(() => {
        this.getLiveUpdate(this);
        // }, 10);
      }, remainingMiliSec);
    }
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

  sorting(arr) {
    return arr;
    return arr.sort(function (a, b) {
      if (a.role == 'raider')
        return -1;
      else if (a.role == 'allrounder')
        return 0;
      else
        return 1;
    });
  }

  sortingByRole(arr) {
    return arr.sort(function (a, b) {
      return a.order - b.order;
    })
  }
}
