import { Component, OnInit } from '@angular/core';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { CricketService } from '@app/shared/providers/cricket-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 
  info: any;
  loading: boolean = false;
  isloading: boolean;
  scorerdata: any;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private cricketService:CricketService
    ) { }

  ngOnInit() {   
    this.getPointsTable()
    this.gettopscorer('totalpoint');
  }

  //get tournaments points table
  getPointsTable() {
    this.loading = true;
    this.sportsService.getCompetitionInfo().subscribe((res:any) => {
      this.loading = false;
      if (res.data) {
          this.info = res.data;
      }
    },
    error => {
      this.loading = false;
    })
  }

  //get kabaddi scorers
  gettopscorer(type){
    this.isloading = true;
    this.sportsService.getkabaddistats(type).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.scorerdata = res.data
      }
    },
    error => this.isloading = false)
  }


}
