import { Component, OnInit } from '@angular/core';
import { SchemaService } from './schema.service';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {

  constructor(
    public schemaService: SchemaService
  ) { }

  ngOnInit(): void {
   
  }

}
