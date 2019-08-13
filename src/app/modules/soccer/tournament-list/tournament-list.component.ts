import { Component, OnInit } from '@angular/core';
import { SportsService } from '@app/shared/providers/sports-service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  constructor(private sportsSerivce:SportsService) { }

  ngOnInit() {
    this.getTournamentList();
  }

  getTournamentList(){
    this.sportsSerivce.getSoccerTournamentList().subscribe((res:any)=>{
      console.log('soccer res:',res);
      
    })
  }

}
