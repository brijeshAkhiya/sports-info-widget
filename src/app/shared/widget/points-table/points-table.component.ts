import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PointsTableComponent implements OnInit {

  @Input() sport;
  @Input() options;
  data;
  pointstable;
  private toggleSort = false;
  value: any;
  index: any;
  object: any;
  sort: number;

  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    console.log(this.sport);
    console.log(this.options);
    if (this.sport == 'Cricket') {
      this.loadCricketPoints();
      this.data = {
        header_title: this.translateService.get('Shared_Module2.Points_Table')['value'],
        titles: [this.translateService.get('Shared_Module2.TEAM')['value'], 'M', 'W', 'L', 'T', 'N/R', 'P', 'NRR'],
        values: ['image', 'played', 'win', 'loss', 'draw', 'no_result', 'points', 'net_run_rate'],
        class_light_row: ['light-row'],
        sport: this.sport,
        tournamentId: this.options.tournament
      };
    } else if (this.sport == 'Kabaddi') {
      this.loadKabaddiPoints();
      this.data = {
        header_title: this.translateService.get('Shared_Module2.Points_Table')['value'],
        titles: [this.translateService.get('Shared_Module2.TEAM')['value'], 'P', 'W', 'L', 'D', 'SD'],
        values: ['tname', 'matchplayed', 'win', 'loss', 'draw', 'scoredifference'],
        class_light_row: ['light-row'],
        sport: this.sport
      };
    } else if (this.sport == 'Soccer') {
      this.loadsoccerpointtable();
      this.data = {
        header_title: this.translateService.get('Shared_Module2.Points_Table')['value'],
        titles: [this.translateService.get('Shared_Module2.TEAM')['value'], 'P', 'W', 'L', 'D', 'GD', 'Pts'],
        values: ['image', 'played', 'win', 'loss', 'draw', 'goals_diff', 'points'],
        class_light_row: ['light-row'],
        sport: this.sport,
        tournamentId: this.options.tournament

      };
    }
  }

  loadCricketPoints() {
    this.sportsService.gettournamentpointstable(this.options.tournament).subscribe((res: any) => {
      if (res.data) {
        res.data.map((data) => {
          this.pointstable = data.team_standings;
          console.log(this.pointstable);
        });
      }
    });
  }

  loadKabaddiPoints() {
    this.sportsService.getCompetitionInfo().subscribe((res: any) => {
      if (res.data) {
        this.pointstable = res.data.standings[0].tables;
        console.log(this.pointstable);
      }
    });
  }

  loadsoccerpointtable() {
    this.sportsService.getsoccerpointtable(this.options.tournament).subscribe((res: any) => {
      if (res.data && res.data.standings && res.data.standings.length > 0) {
        this.pointstable = res.data.standings[0].groups[0].standings;
        console.log('point table', this.pointstable);
      }
    }, err => { console.log(err); });
  }

  sorttable(event) {
    this.value = event.target.attributes.title.nodeValue;
    this.data.titles.forEach(element => {
      if (element == this.value) {
        this.index = this.data.titles.findIndex(element => element == this.value);
        this.object = this.data.values[this.index];
        if (this.sport == 'kabaddi' && this.object == 'loss') {
          this.pointstable = this.pointstable.map(element => {
            this.sort = element.matchplayed - element.win - element.draw;
            const set = Object.assign({}, element);
            set.loss = this.sort;
            return set;
          });
        }
        this.sortArray();
        this.toggleSort = !this.toggleSort;
      }
    });
  }
  sortArray() {
    if (this.toggleSort) {
      this.pointstable.sort((a, b) => b[this.object] - a[this.object]);
    } else {
      this.pointstable.sort((a, b) => a[this.object] - b[this.object]);
    }
  }
}
