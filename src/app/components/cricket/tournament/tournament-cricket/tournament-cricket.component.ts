import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-cricket',
  templateUrl: './tournament-cricket.component.html',
  styleUrls: ['./tournament-cricket.component.css']
})
export class TournamentCricketComponent implements OnInit {
  master:any 
  constructor(private activatedRoute:ActivatedRoute) { 
    let name = this.activatedRoute.snapshot.params.slug
    this.master =  name.replace(/-/g," ")
    // var trigger = "88888-99-89";
    // var regex = /^\(?([0-9]{5})\)?-?([0-9]{4})-?([0-9]{2})$/g;
    // alert(regex.test('55555-8888-77'))
   }

  ngOnInit() {
  }

}
