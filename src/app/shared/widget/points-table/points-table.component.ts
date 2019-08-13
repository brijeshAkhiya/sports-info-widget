import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CricketService } from '@providers/cricket-service';
import { CommonService } from '@providers/common-service';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService:TranslateService
    ) { }

  ngOnInit() {    
    if(this.sport == 'cricket'){
      this.loadCricketPoints();
      this.data = {
        header_title : this.translateService.get('Shared_Module2.Points_Table')['value'],
        titles : [this.translateService.get('Shared_Module2.TEAM')['value'], 'M', 'W', 'L', 'T', 'N/R', 'P', 'NRR'],
        values : ['image', 'played', 'win', 'loss', 'draw', 'no_result', 'points', 'net_run_rate'],
        class : ['tour-stats-table'],
        class_light_row : ['light-row'],
        sport : 'cricket',
        tournamentId : this.options.tournament
      }            
    }
    else if(this.sport == 'kabaddi'){
      this.loadKabaddiPoints();      
      this.data = {
        header_title : this.translateService.get('Shared_Module2.Points_Table')['value'],
        titles : [this.translateService.get('Shared_Module2.TEAM')['value'], 'P', 'W', 'L', 'D', 'SD'],
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
          this.pointstable = res.data.standings[0].tables;
      }
    })
  }
}