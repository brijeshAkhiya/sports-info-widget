import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute,Router } from '@angular/router';
import { SlugifyPipe } from "../../../../pipes/slugpipe";
import { SplitPipe } from '../../../../pipes/stringsplitpipe';
import { CommonService } from '@providers/common-service';
import { CricketService } from "@providers/cricket-service";


@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {
  tournamentid: any;
  battingleaders: any;
  bowlingleaders: any;
  pointstable: any;
  teamsname: any;
  tournamentname: any;
  latestposts: any;
  popularvideos: any;
  populararticles: any;
  commonnewsparams:any

  constructor(private sportsService: SportsService, private cricketService: CricketService, private activatedroute: ActivatedRoute, private slugifyPipe: SlugifyPipe,private splitpipe: SplitPipe,private router: Router,
    private commonService:CommonService) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.snapshot.params.id)
    this.getPopularArticles();
    this.getTournamentsLeader();
    this.getTournamentPointsTable();
    this.getTournamentTeams();
    this.commonnewsparams= {
      eType: "",
      nLimit: 10,
      eSport: "Cricket",
      eSort:'Latest',
      aIds: [this.tournamentid]
    };
  }

  getTournamentsLeader() {
    this.sportsService.gettournamentleaders(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.battingleaders = res['data'].batting.top_runs;
        this.bowlingleaders = res['data'].bowling.top_wickets;
      }
    })
  }

  //get tournaments points table

  getTournamentPointsTable() {
    this.sportsService.gettournamentpointstable(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        res['data'].map((data) => {
          this.pointstable = data.team_standings
        })
      }
    })
  }

  //get tournament teams

  getTournamentTeams(){
    this.sportsService.gettournamentteams(this.tournamentid).subscribe((res) => {
      if (res['data']) { 
        this.tournamentname = res['data'].season_name;
        res['data'].groups.map((data) => {
            this.teamsname = data.teams  
        })
      }
    })
  }

   //get popular posts

   getPopularArticles() {
    let data = {
      nLimit: 10,
      aIds: [this.tournamentid]
    };
    this.sportsService.getrelatedpost(data).subscribe(res => {
      if (res["data"]) {
        this.populararticles = res["data"];
      }
    });
  }

  //get recent posts

  getRecentPosts() {
    this.commonnewsparams= {
      eType: "",
      nLimit: 10,
      eSport: "Cricket",
      eSort:'Latest',
      aIds: [this.tournamentid]
    };
  }

  //get video posts

  getVideoPosts() {
    this.commonnewsparams= {
      nLimit: 10,
      eType: "Video",
      aIds: [this.tournamentid]
    };
  }


  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type.toLowerCase(), btoa(id),slugname]);
  }

   //get player information

   playerinfo(id, name) {
    let playername = this.splitpipe.transform(name)
    let slugname = this.slugifyPipe.transform(playername);
    this.router.navigate(['/cricket/player', btoa(id), slugname]);
  }

  teamsview(id,name){  
    let slugname = this.slugifyPipe.transform(name);
    this.router.navigate(['/cricket/team',btoa(this.tournamentid),btoa(id),slugname]);
  }

  //writer view 
  writerview(id){
    this.router.navigate(['/writer',btoa(id)])
  }


}
