import { Component, OnInit, Input } from '@angular/core';

import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-scorer-widget',
  templateUrl: './top-scorer-widget.component.html',
  styleUrls: ['./top-scorer-widget.component.css']
})
export class TopScorerWidgetComponent implements OnInit {
  @Input() sport: any;
  isloading: boolean;
  kabaddiscoredata: any;
  kabadditype: any;
  tournamentid: any;
  soccerscoredata: any;
  data = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    if (this.sport == 'Kabaddi') {
      this.gettopscorer('raidtotalpoint');
    } else if (this.sport == 'Soccer') {
      this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'soccer', 'tournament');
      this.getsoccerTopScorer('goals');
    }
  }

  /* get kabaddi scorers */
  gettopscorer(type) {
    this.kabadditype = type;
    this.isloading = true;
    this.sportsService.getkabaddistats(type).subscribe((res: any) => {
      this.isloading = false;
      if (res) {
        this.kabaddiscoredata = res.data;
      }
    },
      (error) => this.isloading = false);
  }

  getsoccerscorer(id) {
    this.isloading = true;
    this.sportsService.getSoccerseasonleaders(id).subscribe((res: any) => {
    });
  }

  /* // get soccer top-scorers */
  getsoccerTopScorer(type) {
    this.data = [];
    this.isloading = true;
    this.sportsService.getsoccerTopScorer(this.tournamentid).subscribe((res: any) => {
      this.isloading = false;
      this.soccerscoredata = res.data.lists;
      let typeData = this.soccerscoredata.filter((list) => list.type == type)[0];
      if (typeData && typeData.leaders && typeData.leaders.length > 0) {
        typeData.leaders.map((leader) => {
          leader.players.map(value => {
            value['rank'] = leader.rank;
            if (this.data.length < 5) {
              this.data.push(value);
            }
          });
        });
      }
    }
      , err => { console.log(err); });
  }



}
