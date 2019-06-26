import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

  options:any = { reqParams : { eSport : 'Cricket'}, title : 'Cricket'}

  constructor(
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    let temp: Array<any> = [atob(this.activatedroute.snapshot.params.id)]
    this.options.reqParams.aIds = temp;
  }

}
