import { Component, OnInit } from '@angular/core';
import { SportsService } from "../../providers/sports-service";


@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  isapply:boolean
  contactObj: {};
  constructor(private sportsService: SportsService) { }

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails(){
    this.sportsService.getcontactdetails().subscribe((res)=>{
        if(res['data']){
          this.contactObj = {};
          res['data'].map((s)=>{
            this.contactObj[s.sKey] = s.sValue
          })
        }
    })
  }

}
