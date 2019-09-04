import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { CricketService } from '@app/shared/providers/cricket-service';
import { ActivatedRoute } from '@angular/router';

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
  tournamentid: any;
  soccerscoredata: any;
  data = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private sportsService: SportsService,
    private commonService: CommonService,
    private cricketService: CricketService
  ) { }

  ngOnInit() {
    if (this.sport == 'kabaddi') {
      this.gettopscorer('raidtotalpoint');
    }
    else if (this.sport == 'soccer') {
      this.tournamentid = this.commonService.getIds(this.activatedroute.parent.snapshot.params.id, 'soccer', 'tournament');
      console.log(this.tournamentid);
      this.getsoccerTopScorer('goals');
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

  getsoccerscorer(id) {
    this.isloading = true
    this.sportsService.getSoccerseasonleaders(id).subscribe((res: any) => {
    })
  }

  // get soccer top-scorers
  getsoccerTopScorer(type) {
    this.data = [];
    this.isloading = true;
    this.sportsService.getsoccerTopScorer(this.tournamentid).subscribe((res: any) => {
      this.isloading = false;
      this.soccerscoredata = res.data.lists;
      this.soccerscoredata.map(element => {
        if (element.type == type) {
          if (element.leaders && element.leaders.length > 0) {
            element.leaders.map(leader => {
              if (leader.players && leader.players.length > 0) {
                leader.players.map(value => {
                  value['rank'] = leader.rank;                  
                  if (this.data.length < 5) {
                    this.data.push(value)
                  }
                });
              }
            });
          }
        }
      });
    }
      , err => { console.log(err) });
  }



}
