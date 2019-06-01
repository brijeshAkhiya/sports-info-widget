import { Injectable } from "@angular/core";

@Injectable()
export class CricketService {

  public flagplaceholder = '/assets/images/logo-placeholder.svg';
  constructor() {
      console.log("cricket service");      
  }

}
