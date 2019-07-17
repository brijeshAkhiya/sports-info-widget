import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = { reqParams : { eSport : 'Kabaddi'}, title : 'Kabaddi' , type:'sport' , id :'kabaddi'}
  constructor() { }

  ngOnInit() {
  }

}
