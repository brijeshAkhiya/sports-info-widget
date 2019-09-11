import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonService } from '@providers/common-service';


@Component({
  selector: 'app-match-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MatchAboutComponent implements OnInit {

  @Input() data: any;
  @Input() competitor: any;
  @Input() toss: any;
  @Input() sport: any;

  teamsresultsscore;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    console.log('toss', this.toss);
    console.log('datacheck', this.data);
    console.log(this.competitor);

    if (this.sport == 'cricket')
      this.initCricket();
    // else if(this.sport == 'soccer')
    //   this.initSoccer();

  }

  initCricket() {

    if (this.data['sport_event_status']['status'] == 'closed') {
      const compititors = this.data['sport_event']['competitors'];
      const scores = this.data['sport_event_status']['period_scores'];

      const obj = {};
      compititors.map((sComp) => {
        obj[sComp.qualifier] = sComp;
        const temp = (sComp.qualifier == 'home') ? this.data['sport_event_status']['period_scores'].filter((score) => score.home_score) : this.data['sport_event_status']['period_scores'].filter((score) => score.away_score);
        obj[sComp.qualifier].period_score = temp[0];
      });
    }
  }

  initSoccer() {

    if (this.data['sport_event_status']['status'] == 'closed') {
      const compititors = this.data['sport_event']['competitors'];
      const scores = this.data['sport_event_status']['period_scores'];

      const obj = {};
      compititors.map((sComp) => {
        obj[sComp.qualifier] = sComp;
        const temp = (sComp.qualifier == 'home') ? this.data['sport_event_status']['period_scores'].filter((score) => score.home_score) : this.data['sport_event_status']['period_scores'].filter((score) => score.away_score);
        obj[sComp.qualifier].period_score = temp[0];
      });
    }
  }
}
