import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SportsService } from '../../providers/sports-service';


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

  constructor(private sportsService: SportsService) { }

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
    this.sportsService.getcurrentseries().subscribe((res) => {
      if (res['data']) {
        this.dataitems = res['data']        
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
      }
    })
  }


}
