import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { SplitPipe } from '../pipes/stringsplitpipe';
import { SlugifyPipe } from '../pipes/slugpipe';

@Injectable()
export class CricketService {

  public flagplaceholder = '/assets/images/logo-placeholder.svg';
  
  constructor(
    private splitpipe: SplitPipe,
    private slugifyPipe: SplitPipe,
    private router: Router
  ) {
      console.log("cricket service");      
  }

  playerview(id,name){
    let playername = this.splitpipe.transform(name)
    let slugname = this.slugifyPipe.transform(playername);
    this.router.navigate(['/cricket/player', btoa(id), slugname]);
  }

}
