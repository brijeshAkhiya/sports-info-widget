import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@providers/common-service';
import { TranslateService } from '@ngx-translate/core';
import { ArrToStringPipe } from '@app/shared/pipes/arr-to-string.pipe';


@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PointsTableComponent implements OnInit,OnChanges {

  @Input() sport;
  @Input() options;
  data;
  pointstable;
  private toggleSort = false;
  value: any;
  index: any;
  object: any;
  sort: number;
  sorting = 'ASC';
  prevstate: any;

  constructor(
    public commonService: CommonService,
    private sportsService: SportsService,
    private translateService: TranslateService,
    public ArrToStringPipe: ArrToStringPipe
  ) { }
  ngOnChanges() {
    // this.object = this.options.values[0];
    // this.value = this.options.titles[0];
    this.sorting = 'ASC';
  }
  ngOnInit() {
  
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
        });
      }
    });
  }

  loadKabaddiPoints() {
    this.sportsService.getCompetitionInfo().subscribe((res: any) => {
      if (res.data) {
        this.pointstable = res.data.standings[0].tables;
      }
    });
  }

  loadsoccerpointtable() {
    this.sportsService.getsoccerpointtable(this.options.tournament).subscribe((res: any) => {
      if (res.data && res.data.standings && res.data.standings.length > 0) {
        this.pointstable = res.data.standings[0].groups[0].standings;
      }
    });
  }

  sorttable(event) {
    this.value = event.target.attributes.title.nodeValue;
    this.data.titles.forEach(element => {
      if (element == this.value) {
        this.index = this.data.titles.findIndex(element => element == this.value);
        this.prevstate = this.object;
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
      }
    });
  }

sortArray() {
    if (this.prevstate === this.object) {
    } else {
      this.sorting = 'ASC';
    }

    if (this.object.includes('.')) {
      let filterPipe = new ArrToStringPipe();
      if (this.sorting == 'DESC') {
        this.data.sort((a, b) => filterPipe.transform(a, this.object) - filterPipe.transform(b, this.object));
        this.sorting = 'ASC';
      } else {
        this.data.sort((a, b) => filterPipe.transform(b, this.object) - filterPipe.transform(a, this.object));
        this.sorting = 'DESC';
      }
    } else {
      if (this.sorting == 'DESC') {
        this.data.sort((a, b) => a[this.object] - b[this.object]);
        this.sorting = 'ASC';
      } else {
        this.data.sort((a, b) => b[this.object] - a[this.object]);
        this.sorting = 'DESC';
      }
    }
  }
}
