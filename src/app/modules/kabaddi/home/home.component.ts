import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { CricketService } from '@app/shared/providers/cricket-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = { reqParams : { eSport : 'Kabaddi'}, title : 'Kabaddi' , type:'sport' , id :'kabaddi'}
  scorerdata: any;
  isloading: boolean;
  constructor(
    private commonService: CommonService,
    private sportsService: SportsService,
    private cricketService:CricketService
  ) { }

  ngOnInit() {
   
  }


}
