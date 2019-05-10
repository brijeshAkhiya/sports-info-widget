import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute,Router } from '@angular/router';
import { SlugifyPipe } from "../../../../pipes/slugpipe";

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

  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute, private slugifyPipe: SlugifyPipe,private router: Router) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.snapshot.params.id)
    this.getPopularArticles();
    this.getTournamentsLeader();
    this.getTournamentPointsTable();
    this.getTournamentTeams();
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
    let data = {
      eType: "",
      nLimit: 10,
      eSport: "Cricket",
      eSort:'Latest',
      aIds: [this.tournamentid]
    };
    this.sportsService.getrelatedpost(data).subscribe(res => {
      if (res["data"]) {
        this.latestposts = res["data"];
      }
    });
  }

  //get video posts

  getVideoPosts() {
    let data = {
      nLimit: 10,
      eType: "Video",
      aIds: [this.tournamentid]
    };
    this.sportsService.getrelatedpost(data).subscribe(res => {
      if (res["data"]) {
        this.popularvideos = res["data"];
      }
    });
  }


  //blog view

  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog", type, btoa(id),slugname]);
  }


}
