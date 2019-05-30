import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SportsService } from "../../../providers/sports-service";


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class PrivacyPolicyComponent implements OnInit {
  cmsdata;

  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getCMSContent();
  }


  getCMSContent(){
    let sKey = 'Privacy Policies'
    this.sportsService.getcmscontent(sKey).subscribe((res)=>{
      if(res){
        this.cmsdata = res
      }
    })
  }
}
