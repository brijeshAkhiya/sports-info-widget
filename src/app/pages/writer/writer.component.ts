import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "@providers/sports-service";
import { CommonService } from "@providers/common-service";


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit {

  writerdata :any;
  writerid;
  
  constructor(
    private sportsService: SportsService,
    private activatedroute: ActivatedRoute, 
    public commonService: CommonService
  ) { }

  ngOnInit() {
    this.writerid = this.activatedroute.snapshot.params.id;
    this.getWriterProfile();
  }


  //get writer info 
  getWriterProfile() {
    let data = {
      _id:this.writerid,
      nLimit:20
    };
    this.sportsService.getwriterprofile(data).subscribe(res => {
      if (res["data"]) {
        this.writerdata = res['data']
      }
    });
  }

}
