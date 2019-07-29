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
  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private cricketService: CricketService
  ) { }

  ngOnInit() {
    if (this.sport == 'kabaddi') {
      this.gettopscorer('totalpoint');
    }
  }

  //get kabaddi scorers
  gettopscorer(type) {
    this.isloading = true;
    this.sportsService.getkabaddistats(type).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.kabaddiscoredata = res.data
      }
    },
      error => this.isloading = false)
  }

}
