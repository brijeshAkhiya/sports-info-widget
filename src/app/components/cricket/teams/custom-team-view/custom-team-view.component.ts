import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SlugifyPipe } from '../../../../pipes/slugpipe';
import { SplitPipe } from '../../../../pipes/stringsplitpipe';
import { CricketService } from "@providers/cricket-service";
@Component({
  selector: 'app-custom-team-view',
  templateUrl: './custom-team-view.component.html',
  styleUrls: ['./custom-team-view.component.css']
})
export class CustomTeamViewComponent implements OnInit {
  commonnewsparams = {}
  teamid: any;
  tournamentid: any;
  fixturesdata: any;
  widget1title = "Current Series";
  widget1type = "currentseries";
  noteamfixtures: boolean = false;
  teamprofiledata: any;
  teamsplaceholder = '../../../../../assets/images/logo-placeholder.svg'
  constructor(private sportsService: SportsService, private cricketService: CricketService,private activatedroute: ActivatedRoute,private router: Router,private slugifyPipe: SlugifyPipe,private splitpipe: SplitPipe) { }

  ngOnInit() {
    this.teamid = atob(this.activatedroute.snapshot.params.teamid)
    this.getTournamentTeamProfile();
  }


    //get tournament team profile
    getTournamentTeamProfile(){
      if(this.teamid){
      this.sportsService.getteamprofileview(this.teamid).subscribe((res)=>{
        console.log(res);
        
        if(res['data']){
            this.teamprofiledata = res['data'];  
        }
      },(error)=>{
        if(error['error'].status == 500 || error['error'].status == 400){
          this.router.navigate(['/page-not-found'])
        }
      })
    }
    }
  
    //get team fixtures
    getTeamFixtures() {
      this.sportsService.getteamfixtures(this.teamid).subscribe((res) => {
        if (res['data']) {
          let dataarray = []
          dataarray = res['data'].schedule
          let dateObj = {}
          dataarray.map((data) => {
            let mdate = moment(data.scheduled).format('Do MMMM YYYY');
            if (!dateObj[mdate]) {
              dateObj[mdate] = []
            }
          })
          dataarray.map((data) => {
            let mdate = moment(data.scheduled).format('Do MMMM YYYY');
            dateObj[mdate].push(data)
          })
          this.fixturesdata = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
          
        }
      },
      (error)=>{
        if(error['error'].status == 500){
          this.router.navigate(['/page-not-found'])
        }
        if(error['error'].status == 400){
          this.noteamfixtures = true
        }
    })
    }
  
    getarticles() {
      this.commonnewsparams = {
        eSport: 'Cricket',
        nStart:0,
        nLimit:4,
        aIds: [this.teamid]
      }
    }
    
     //get match detail
     matchDetail(id,team1,team2){
      let teams =  team1.concat('-',team2)  
      this.router.navigate(['/cricket/match',btoa(id),teams])
    }
  
    //player view profile
    playerview(id,name){
      let playername = this.splitpipe.transform(name)
      let slugname = this.slugifyPipe.transform(playername);
      this.router.navigate(['/cricket/player', btoa(id), slugname]);
    }
}
