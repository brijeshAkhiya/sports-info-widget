import { Component, OnInit } from '@angular/core';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.css']
})
export class TournamentTableComponent implements OnInit {
  tournamentid: any;
  pointstable: any;
  loading: boolean;
  sport = 'Soccer';

  constructor(
    private sportsService: SportsService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tournamentid = this.commonService.getIds(this.activatedRoute.parent.snapshot.params.id, 'soccer', 'tournament');
    this.loadsoccerpointtable();
  }

  loadsoccerpointtable() {
    this.loading = true;
    this.sportsService.getsoccerpointtable(this.tournamentid).subscribe((res: any) => {
      if (res.data) {
        this.loading = false;
        this.pointstable = res.data.standings;
        res.data.standings.map((sData) => {
          if (sData.type == 'total') {
            sData.groups[0].standings.map((gData) => {
              gData['teamname'] = gData.competitor.name;
              this.pointstable.push(gData);
            });
          }
        });
      }
    }, (err) => { this.loading = false; }

    );
  }

}
