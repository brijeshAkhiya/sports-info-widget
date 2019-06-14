import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SportsService } from '@providers/sports-service';
import { SlugifyPipe } from '@pipes/slugpipe';

@Component({
  selector: 'app-cricket-fixtures',
  templateUrl: './cricket-fixtures.component.html',
  styleUrls: ['./cricket-fixtures.component.css']
})
export class CricketFixturesComponent implements OnInit {
  cricketseries: any;
  internationalschedual = []
  domesticschedual = [];
  internationalresult:any;
  domesticresult: any;
  widget1title = 'Current Series';
  widget1type = 'currentseries'
  constructor(private sportsService: SportsService,private router:Router,private slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.getCricketSeries();
  }


  //get current cricket series 

  getCricketSeries() {
    this.sportsService.getcricketfixtures().pipe(distinctUntilChanged()).subscribe((res) => {
      if (res['data']) {
        this.cricketseries = res['data']
        this.cricketseries.map((data) => {
          if (data.category == 'International') {
            this.internationalschedual.push(data);
          }
        })
        let dateObj = {} 
        this.internationalschedual.map((data)=>{
          let mdate = moment(data.start_date).format('MMMM YYYY');   
          if(!dateObj[mdate]){
            dateObj[mdate] = []
          }
        })
        this.internationalschedual.map((data)=>{
          let mdate = moment(data.start_date).format('MMMM YYYY');
          dateObj[mdate].push(data)
        })
        this.internationalresult = Object.keys(dateObj).map(month => ({ month, data: dateObj[month] }));
      }
    })
  }

  //get domestic schedual

  getDomesticSchedual() {
    this.cricketseries.map((data) => {
      if (data.category != 'International') {
        this.domesticschedual.push(data)
      }
    })
    let dateObj = {} 
    this.domesticschedual.map((data)=>{
      let mdate = moment(data.start_date).format('MMMM YYYY');  
      if(!dateObj[mdate]){
        dateObj[mdate] = []
      }
    })
    this.domesticschedual.map((data)=>{
      let mdate = moment(data.start_date).format('MMMM YYYY');
      dateObj[mdate].push(data)
    })
    this.domesticresult = Object.keys(dateObj).map(month => ({ month, data: dateObj[month] }));
    this.domesticschedual = [];
  }

  //get tournament info

  getFixturesInfo(id,name){
    let slugname  =  this.slugifyPipe.transform(name); 
    this.router.navigate(['/cricket/tournament',btoa(id),slugname]);
  }


}
