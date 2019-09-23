import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements OnInit {

  params: any;
  tournamentid: any;

  constructor(
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    const data: any = this.activatedroute.data;
    this.params = data.value;
  }

}
