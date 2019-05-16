import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from '../../../../pipes/slugpipe';
import { SplitPipe } from '../../../../pipes/stringsplitpipe';

@Component({
  selector: 'app-tournament-state',
  templateUrl: './tournament-state.component.html',
  styleUrls: ['./tournament-state.component.css']
})
export class TournamentStateComponent implements OnInit {
  widget1title = 'Recommended links';
  widget1type = 'currentseries'
  tournamentid: any;
  battingleaders: any;
  bowlingleaders: any;
  fieldingleaders: any;
  nostatistics: boolean ;
  isdata:boolean

  constructor(private sportsService: SportsService, private activatedroute: ActivatedRoute, private slugifyPipe: SlugifyPipe, private router: Router, private splitpipe: SplitPipe) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.snapshot.parent.params.id)
    this.getTournamentsLeader();
  }

  getTournamentsLeader() {
    this.isdata = false
    this.sportsService.gettournamentleaders(this.tournamentid).subscribe((res) => {
      if (res['data']) {
        this.isdata = true
        this.battingleaders = res['data'].batting;
        this.bowlingleaders = res['data'].bowling;
        this.fieldingleaders = res['data'].fielding
      }
    },(error)=>{
      if(error['error'].status == 400){
        this.nostatistics = true
      }
    })
  }

  //get player information

  playerinfo(id, name) {
    let playername = this.splitpipe.transform(name)
    let slugname = this.slugifyPipe.transform(playername);
    this.router.navigate(['/cricket/player', btoa(id), slugname]);
  }


}
