import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WriterComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(){}

}
