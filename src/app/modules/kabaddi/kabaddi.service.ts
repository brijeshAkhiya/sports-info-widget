import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'

import * as fromRoot from '../../app-reducer'

@Injectable({
  providedIn: 'root'
})
export class KabaddiService {
  teamlogosObj = {}
  constructor(private store: Store<fromRoot.State>) {

    this.store.select('KabaddiLogos').subscribe((data: any) => {
      let teamsdata = data.kabaddilogos
      let teamsarray = []
      if (teamsdata.length > 0) {
        teamsdata.map((data) => {
          teamsarray[data.tid] = data
        })
      }
      this.teamlogosObj = { ...teamsarray }
    })
  }
  
  //get kabaddi team logo

  getKabaddiLogo(teamid) {
    return this.teamlogosObj[teamid].teamlogo
  }

}

