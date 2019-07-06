import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { SplitPipe } from '@pipes/stringsplitpipe';
import { SlugifyPipe } from '@pipes/slugpipe';

@Injectable()
export class CricketService {

  public flagplaceholder = '/assets/images/logo-placeholder.svg';
  public playerplaceholder = '/assets/images/placeholder-sqad.svg';
  public teamPlaceholder = '/assets/images/logo-placeholder.svg';

  constructor(
    private splitpipe: SplitPipe,
    private slugifyPipe: SlugifyPipe,
    private router: Router
  ) {
  }

  initCompetitorScore(arr){
    return arr.map((data, matchIndex) => {
      let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
      let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
      if(data.period_scores){
        data.period_scores.map((pscore, index) => {
          if (pscore.home_score) {
            (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore)
          } else {
            (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore)
          }
        })
      }
      return data;
    });
  }

  playerview(id, name) {
    let playername = this.splitpipe.transform(name)
    let slugname = this.slugifyPipe.transform(playername);
    this.router.navigate(['/cricket/player', btoa(id), slugname]);
  }


  teamInfo(id, name) {
    let slugname = this.slugifyPipe.transform(name);
    this.router.navigate(['/cricket/team', btoa(id), slugname]);
  }


  //get tournament info

  tournamentInfo(id,name){
    let slugname  =  this.slugifyPipe.transform(name); 
    this.router.navigate(['/cricket/tournament',btoa(id),slugname]);
  }

 

}
