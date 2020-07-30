import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  public schema;

  constructor() { }

  prepareSchema(data) {
    this.schema = data;
  }
}
