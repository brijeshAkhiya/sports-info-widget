import { Component, OnInit } from '@angular/core';
import { SportsService } from "../../../providers/sports-service";

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  cmsdata;

  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getCMSContent();
  }

  getCMSContent(){
    let sKey = 'T & C'
    this.sportsService.getcmscontent(sKey).subscribe((res)=>{
      if(res){
        this.cmsdata = res
      }
    })
  }

}
