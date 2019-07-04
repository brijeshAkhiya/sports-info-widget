import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SportsService } from '@providers/sports-service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SlugifyPipe } from '@pipes/slugpipe';
import { SplitPipe } from '@pipes/stringsplitpipe';

@Component({
  selector: 'app-common-story-widget',
  templateUrl: './common-story-widget.component.html',
  styleUrls: ['./common-story-widget.component.css']
})
export class CommonStoryWidgetComponent implements OnInit, OnChanges {
  @Input() title: any;
  @Input() type: any;
  @Input() data: any;
  dataitems: any;

  constructor(private sportsService: SportsService,private slugifyPipe: SlugifyPipe,private router:Router,private splitpipe: SplitPipe) { }

  ngOnInit() { }

  ngOnChanges(changes: any): void {
    if(changes['type'].currentValue == 'currentseries'){
      this.getCricketSeries();
    }
    else if (changes['type'].currentValue == 'populartags'){
      this.getPopularTags();
    }

  }


   //get current cricket series 

   getCricketSeries() {
    this.sportsService.getcurrentseries().pipe(distinctUntilChanged()).subscribe((res) => {
      if (res['data']) {
        this.dataitems = res['data']      
        console.log('series',this.dataitems);
          
      }
    })
  }

  //get popular cricket tags 

  getPopularTags() {
    let data = {
      eSport: 'Cricket'
    }
    this.sportsService.getpopulartags(data).subscribe((res) => {
      if (res['data']) {
        this.dataitems = res['data']
        console.log('tags',this.dataitems);

      }
    })
  }

  route(id,tournamentid,type,name){
    //  if(tournamentid){
    //   let tournamentslug  =  this.slugifyPipe.transform(name); 
    //   this.router.navigate(['/cricket/tournament',tournamentid,tournamentslug]);
    //  }
    if(type == 'Match'){
      
    }
    if(type == 'Tournament'){
      let tournamentslug  =  this.slugifyPipe.transform(name); 
      this.router.navigate(['/cricket/tournament',id,tournamentslug]);
    }
    if(type == 'Player'){
      let playername = this.splitpipe.transform(name)
      let slugname = this.slugifyPipe.transform(playername);
      this.router.navigate(['/cricket/player', id, slugname]);
    }
    if(type == 'Team'){
      let slugname = this.slugifyPipe.transform(name);
      this.router.navigate(['/cricket/team',id,slugname]);
    }
    
    
  }


}
