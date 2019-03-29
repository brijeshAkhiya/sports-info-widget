import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'
  users$:Observable<any>
  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.users$ = this.http.get('https://jsonplaceholder.typicode.com/posts');

  }


}
