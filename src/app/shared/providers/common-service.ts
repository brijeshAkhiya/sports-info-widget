import { Injectable } from "@angular/core";
import { environment } from "@env";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app-reducer";
import * as MetaTags from "../../store/meta-tags-management/meta-tags.actions";

import { Router } from '@angular/router';

import { SlugifyPipe } from '@pipes/slugpipe';

@Injectable()
export class CommonService {

  public largeblogPlaceholder = '/assets/images/placeholder_blog_large.svg'
  public smallblogPlaceholder = '/assets/images/placeholder_blog_small.svg'
  public writerPlaceholder = '/assets/images/placeholder-author.svg'
  public commenterPlaceholder = '/assets/images/placeholder-commenter.svg'
  public lazyloadoffset = "1000";
  public s3Url
  public siteUrl
  titleObj;
  
  constructor(
    private slugifyPipe: SlugifyPipe,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.s3Url = environment.s3Url
    this.siteUrl = environment.siteUrl
    this.getPageTitles();
  }

  //blog view
  blogview(id, type, title) {
    let slugname = this.slugifyPipe.transform(title);
    this.router.navigate(["/blog",type.toLowerCase(), btoa(id),slugname]);
  }

  //writer view 
  writerview(id){
    this.router.navigate(['/writer',btoa(id)])
  }

  /** Get Milli seconds from Hr, min and seconds */
  miliseconds(hrs, min, sec) {
    return (hrs * 60 * 60 + min * 60 + sec) * 1000;
  }

  /** Get Remaining Time */
  getRemainigTimeofMatch(date) {
    let oneDay = 24 * 60 * 60 * 1000;
    let remainingdays = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let enddate = new Date(date).getTime();
    let now = new Date().getTime();
    let time = enddate - now;

    remainingdays.days = Math.floor(Math.abs((enddate - now) / oneDay));
    if (time >= 0) {
      remainingdays.hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      remainingdays.minutes = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
      );
      remainingdays.seconds = Math.floor((time % (1000 * 60)) / 1000);
    }
    return remainingdays;
  }

  getPageTitles() {
    this.titleObj = {
      "/": { title: "Sports.info" },
      "/about": { title: "About Us" },
      "/advertise-with-us": { title: "Advertise with us" },
      "/blog": { title: "Blog" },
      "/coming-soon/badminton": { title: "Badminton" },
      "/coming-soon/basketball": { title: "Basketball" },
      "/coming-soon/field-Hockey": { title: "Field Hockey" },
      "/coming-soon/racing": { title: "Racing" },
      "/coming-soon/soccer": { title: "Soccer" },
      "/coming-soon/tennis-sports": { title: "Tennis Sports" },
      "/contact-us": { title: "Contact Us" },
      "/cricket": { title: "Cricket" },
      "/cricket/fixtures": { title: "Cricket Fixtures" },
      "/cricket/recent-fixtures/results/view": { title: "Cricket Recent Results" },
      "/cricket/recent-fixtures/upcoming/view": { title: "Cricket Recent Fixtures" },
      "/privacy-policy": { title: "Privacy Policy" },
      "/terms-and-conditions": { title: "Terms & conditions" },
    }
  }

  getPagetitlebyurl(url) {
    if (this.titleObj[url]) {
      return this.titleObj[url].title
    }
    else {
      var last = url.split("/").pop();
      return last.replace(/-/g, ' ');
    }
  }

  
}
