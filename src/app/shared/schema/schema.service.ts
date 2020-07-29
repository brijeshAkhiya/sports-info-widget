import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  public schema;

  constructor() { }
  
  updateSchema(data: any = null) {

    data = (data == null) ? this.getDefaultData() : data;
    
    this.schema = data;
  }

  getDefaultData() {
    return {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      name: 'angular.io',
      url: 'https://angular.io'
    };
  }
}
