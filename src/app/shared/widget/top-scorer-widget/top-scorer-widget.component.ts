import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { CricketService } from '@app/shared/providers/cricket-service';

@Component({
  selector: 'app-top-scorer-widget',
  templateUrl: './top-scorer-widget.component.html',
  styleUrls: ['./top-scorer-widget.component.css']
})
export class TopScorerWidgetComponent implements OnInit {
  @Input() sport: any
  isloading: boolean;
  kabaddiscoredata: any;
  kabadditype: any;
  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private cricketService: CricketService
  ) { }

  ngOnInit() {
    if (this.sport == 'kabaddi') {
      this.gettopscorer('raidtotalpoint');
    }
    else if(this.sport == 'soccer'){
      console.log('soccer');
      
    }
  }

  //get kabaddi scorers
  gettopscorer(type) {
    this.kabadditype = type
    this.isloading = true;
    this.sportsService.getkabaddistats(type).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.kabaddiscoredata = res.data
      }
    },
      (error) => this.isloading = false)
  }

  getsoccerscorer(id){
    this.isloading = true
    this.sportsService.getSoccerseasonleaders(id).subscribe((res:any)=>{
    })
  }

  

}
