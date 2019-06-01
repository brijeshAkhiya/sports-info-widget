import { Injectable } from "@angular/core";
import { environment } from "@env";

@Injectable()
export class CommonService {

  public largeblogPlaceholder = '/assets/images/placeholder_blog_large.svg'
  public smallblogPlaceholder = '/assets/images/placeholder_blog_small.svg'
  public s3Url
  public siteUrl
  constructor() {
    console.log("common service");    
    this.s3Url = environment.s3Url    
    this.siteUrl = environment.siteUrl
  }

}
