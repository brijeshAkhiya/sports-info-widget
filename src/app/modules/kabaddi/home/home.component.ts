import { Component, OnInit } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = {
    reqParams: { eSport: 'Kabaddi' },
    title: this.translateservice.get('Header_menu.Kabaddi')['value'],
    type: 'sport',
    id: 'kabaddi'
  };
  scorerdata: any;
  isloading: boolean;
  constructor(
    private commonService: CommonService,
    private sportsService: SportsService,
    private translateservice: TranslateService
  ) { }

  ngOnInit() { }


}
