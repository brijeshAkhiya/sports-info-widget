import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
@Component({
  selector: 'app-pointstable-widget',
  templateUrl: './pointstable-widget.component.html',
  styleUrls: ['./pointstable-widget.component.css']
})
export class PointstableWidgetComponent implements OnInit {
  @Input() tournamentId: any;
  pointstable: any;
  constructor(private sportsService: SportsService,private cricketService:CricketService) { }

  ngOnInit() {
    if (this.tournamentId) {
      this.getTournamentPointsTable();
    }
    console.log('tourid ::::',this.tournamentId);
    
  }

  //get tournaments points table

  getTournamentPointsTable() {
    this.sportsService.gettournamentpointstable(this.tournamentId).subscribe((res) => {
      if (res['data']) {
        res['data'].map((data) => {
          this.pointstable = data.team_standings
          console.log(this.pointstable);
        })
      }
    })
  }

}
