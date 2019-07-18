import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { SportsService } from '@providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';
import { KabaddiService } from './kabaddi.service';

import * as KabaddiTeamLogo from "../../store/kabaddi-team-logo/kabaddi-team-logo.actions";
import * as fromRoot from '../../app-reducer'



@Component({
  selector: 'app-kabaddi',
  templateUrl: './kabaddi.component.html'
})
export class KabaddiComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private kabaddiservice: KabaddiService,
    private sportsService: SportsService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.getTeamList({ page: 1, per_page: 50 })
  }

  getTeamList(params) {
    this.sportsService.getkabadditeamlist(params).subscribe((res: any) => {
      if (res) {
        this.store.dispatch(new KabaddiTeamLogo.SaveKabaddiTeamLogos(res.data.items));
      }
    })
  }


}
