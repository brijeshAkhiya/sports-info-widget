import { Component, OnInit } from '@angular/core';

import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 
  info: any;
  loading: boolean = false;

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService
    ) { }

  ngOnInit() {   
    this.getPointsTable()
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


}
