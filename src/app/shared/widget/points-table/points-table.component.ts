import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.css']
})
export class PointsTableComponent implements OnInit {

  @Input() sport;
  @Input() options;
  data;
  pointstable;

  constructor(
    public commonService:CommonService,
    public cricketService:CricketService,
    private sportsService:SportsService,
    ) { }

  ngOnInit() {    
    if(this.sport == 'cricket'){
      this.loadCricketPoints();
      this.data = {
        header_title : 'Points Table',
        titles : ['TEAM', 'M', 'W', 'L', 'T', 'N/R', 'P', 'NRR'],
        values : ['image', 'played', 'win', 'loss', 'draw', 'no_result', 'points', 'net_run_rate'],
        class : ['tour-stats-table'],
        class_light_row : ['light-row'],
        sport : 'cricket',
        tournamentId : this.options.tournament
      }            
    }
    else if(this.sport == 'cricket'){
      this.loadKabaddiPoints();      
      this.data = {
        header_title : 'Points Table',
        titles : ['TEAM', 'P', 'W', 'L', 'D', 'SD'],
        values : ['tname', 'matchplayed', 'win', 'loss', 'draw', 'scoredifference'],
        class : ['tour-stats-table'],
        class_light_row : ['light-row'],
        sport : 'kabaddi'
      }
    }
  }

  loadCricketPoints(){
    this.sportsService.gettournamentpointstable(this.options.tournament).subscribe((res:any) => {
      if (res.data) {
        res.data.map((data) => {
          this.pointstable = data.team_standings
        })
      }
    })
  }

  loadKabaddiPoints(){ 
    this.sportsService.getCompetitionInfo().subscribe((res:any) => {
      if (res.data) {
          this.pointstable = res.data.standings;
      }
    })
  }

}