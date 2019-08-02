import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app-reducer";
import * as Cricket from "@store/cricket/cricket.actions";

@Component({
  selector: 'app-api-store',
  templateUrl: './api-store.component.html',
  styleUrls: ['./api-store.component.css']
})
export class ApiStoreComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new Cricket.LoadCricketFixtures())
    this.store.dispatch(new Cricket.LoadCricketResults())
  }

}
