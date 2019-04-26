import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-cricket',
  templateUrl: './tournament-cricket.component.html',
  styleUrls: ['./tournament-cricket.component.css']
})
export class TournamentCricketComponent implements OnInit {
  master:any = 'ipl 2019'
  constructor(private activatedRoute:ActivatedRoute) { 
    console.log('ROUTEPRA',this.activatedRoute.snapshot.params.slug);
      // let unslug = this.activatedRoute.snapshot.params.slug
      // console.log(unslug.replace(/-/i, ""));
      
      
   }

  ngOnInit() {
  }

}
