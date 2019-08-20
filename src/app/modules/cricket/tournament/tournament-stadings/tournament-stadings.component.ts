import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tournament-stadings',
  templateUrl: './tournament-stadings.component.html',
  styleUrls: ['./tournament-stadings.component.css']
})
export class TournamentStadingsComponent implements OnInit {
  
  pointstable: any;
  options = {
    sport:'cricket',
    titles : ['POS',this.translateService.get('Shared_Module2.TEAM')['value'], 'M', 'W', 'L', 'D', 'N/R', 'P', 'NRR'],
    values : ['rank', 'image', 'played', 'win', 'loss', 'draw', 'no_result', 'points', 'net_run_rate'],
    image_type :'team',
    class:'tour-stand-table',
    tr_class:'tour-stand-table'
  }
  isLoading: boolean = false;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private activatedroute: ActivatedRoute,
    private translateService:TranslateService
    ) { }

  ngOnInit() {    
    let id = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id ,'cricket','tournament');
    this.getTournamentPointsTable(id)
  }

  //get tournaments points table
  getTournamentPointsTable(id) {
    this.isLoading = true;
    this.sportsService.gettournamentpointstable(id).subscribe((res:any) => {
      this.isLoading = false;
      if (res.data) {
        res.data.map((data) => {
          this.pointstable = data.team_standings
        })
      }
    },
    error => {
      this.isLoading = false;
    })
  }

}
