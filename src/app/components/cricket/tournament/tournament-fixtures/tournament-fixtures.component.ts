import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../../../providers/sports-service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-tournament-fixtures',
  templateUrl: './tournament-fixtures.component.html',
  styleUrls: ['./tournament-fixtures.component.css']
})
export class TournamentFixturesComponent implements OnInit {
  tournamentid: any;
  fixturesdata: any;
  fixturesresult: any;
  
  constructor(private activatedroute: ActivatedRoute,private sportsService: SportsService,) { }

  ngOnInit() {
    this.tournamentid = atob(this.activatedroute.parent.snapshot.params.id) //get parent route params
    this.getTournamentFixtures();
  }

  getTournamentFixtures(){
    this.sportsService.gettournamentfixtures(this.tournamentid).subscribe((res) => {
      if (res['data']) {
       
        this.fixturesdata = res['data']
        let dateObj = {} 
        this.fixturesdata.map((data)=>{
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');   
          if(!dateObj[mdate]){
            dateObj[mdate] = []
          }
        })
        this.fixturesdata.map((data)=>{
          let mdate = moment(data.scheduled).format('Do MMMM YYYY');
          dateObj[mdate].push(data)
        })
        this.fixturesresult = Object.keys(dateObj).map(day => ({ day, data: dateObj[day] }))
        
      }
    })
  }

}
