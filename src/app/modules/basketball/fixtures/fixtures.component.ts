import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  params;
  paramsData = { reqParams: { 'status': 1, 'per_page': 10, 'page': 1 }, loading: false, loadmore: false, data: [] };

  constructor() { }

  ngOnInit() {
  }

}
