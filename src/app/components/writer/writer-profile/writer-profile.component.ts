import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SportsService } from "../../../providers/sports-service";
import { SlugifyPipe } from "../../../pipes/slugpipe";

@Component({
  selector: 'app-writer-profile',
  templateUrl: './writer-profile.component.html',
  styleUrls: ['./writer-profile.component.css']
})
export class WriterProfileComponent implements OnInit {
  writerdata :any;
  writerid;
  commonrecentparams :{}
  commonpopularparams:{}
  commonvideoparams:{}
  constructor(private sportsService: SportsService, private slugifyPipe: SlugifyPipe, private router: Router,private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.writerid = atob(this.activatedroute.snapshot.params.id);
    this.getWriterProfile();
    this.commonrecentparams = {
      _id:this.writerid,
      nLimit:10
    }
  }


  //get writer info 
  getWriterProfile() {
    let data = {
      _id:this.writerid
    };
    this.sportsService.getwriterprofile(data).subscribe(res => {
      if (res["data"]) {
        this.writerdata = res['data']
      }
    });
  }

  //get writer popular blogs
  getWriteropularblogs(){
    this.commonpopularparams = {
      _id:this.writerid,
      eType:"MostViewed",
      nLimit:10
    }
  }

  //get writer videos 
  getWritervideos(){
    this.commonvideoparams = {
      _id:this.writerid,
      eType:'Videos',
      nLimit:10
    }
  }

}
