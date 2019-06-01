import { Injectable } from "@angular/core";

@Injectable()
export class CommonService {

  public largeblogPlaceholder = '/assets/images/placeholder_blog_large.svg'
  public smallblogPlaceholder = '/assets/images/placeholder_blog_small.svg'
  
  constructor() {
      console.log("common service");      
  }

}
