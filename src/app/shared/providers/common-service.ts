import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import * as fromRoot from '../../app-reducer';
import * as MetaTags from '../../store/meta-tags-management/meta-tags.actions';

import { Router } from '@angular/router';

import { SlugifyPipe } from '@pipes/slugpipe';

@Injectable()
export class CommonService {

  public largeblogPlaceholder = '/assets/images/placeholder_blog_large.svg';
  public smallblogPlaceholder = '/assets/images/placeholder_blog_small.svg';
  public writerPlaceholder = '/assets/images/placeholder-author.svg';
  public commenterPlaceholder = '/assets/images/placeholder-commenter.svg';
  public flagplaceholder = '/assets/images/logo-placeholder.svg';
  public playerplaceholder = '/assets/images/placeholder-sqad.svg';
  public teamPlaceholder = '/assets/images/logo-placeholder.svg';
  public lazyloadoffset = '1500';
  public s3Url;
  public siteUrl;
  titleObj;

  constructor(
    private slugifyPipe: SlugifyPipe,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.s3Url = environment.s3Url;
    this.siteUrl = environment.siteUrl;
    this.getPageTitles();
  }

  /* writer view  */
  writerview(id) {
    this.router.navigate(['/writer', btoa(id)]);
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

  sortArr(data, format, date_param, sort_type) {
    data.sort((a, b) => {
      if (sort_type === 'asc') {
        return new Date(a[date_param]) < new Date(b[date_param]) ? -1 : new Date(a[date_param]) > new Date(b[date_param]) ? 1 : 0;
      } else {
        return new Date(a[date_param]) > new Date(b[date_param]) ? -1 : new Date(a[date_param]) < new Date(b[date_param]) ? 1 : 0;
      }
    });
    let dateObj = {};
    data.map((data) => {
      let mdate = moment(data[date_param]).format(format);
      if (!dateObj[mdate]) dateObj[mdate] = [];
      dateObj[mdate].push(data);
    });
    return Object.keys(dateObj).map(key => ({ key, data: dateObj[key] }));
  }

  getPageTitles() {
    this.titleObj = {
      '/': { title: 'Sports.info' },
      '/about': { title: 'About Us' },
      '/advertise-with-us': { title: 'Advertise with us' },
      '/blog': { title: 'Blog' },
      '/coming-soon/badminton': { title: 'Badminton' },
      '/coming-soon/basketball': { title: 'Basketball' },
      '/coming-soon/field-Hockey': { title: 'Field Hockey' },
      '/coming-soon/racing': { title: 'Racing' },
      '/coming-soon/soccer': { title: 'Soccer' },
      '/coming-soon/tennis-sports': { title: 'Tennis Sports' },
      '/contact-us': { title: 'Contact Us' },
      '/cricket': { title: 'Cricket' },
      '/cricket/fixtures': { title: 'Cricket Fixtures' },
      '/cricket/recent-fixtures/results/view': { title: 'Cricket Recent Results' },
      '/cricket/recent-fixtures/upcoming/view': { title: 'Cricket Recent Fixtures' },
      '/privacy-policy': { title: 'Privacy Policy' },
      '/terms-and-conditions': { title: 'Terms & conditions' },
    };
  }

  getPagetitlebyurl(url) {
    let title;
    if (this.titleObj[url]) {
      title = this.titleObj[url].title;
    } else {
      let last = url.split('/').pop();
      title = last.replace(/-/g, ' ');
    }
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  getIds(id, sport, type) {
    if (sport == 'cricket') {
      if (type == 'tournament') {
        return 'sr:tournament:' + id;
      } else if (type == 'match') {
        return 'sr:match:' + id;
      } else if (type == 'team') {
        return 'sr:competitor:' + id;
      } else if (type == 'player') {
        return 'sr:player:' + id;
      }
    } else if (sport == 'soccer') {
      if (type == 'tournament') {
        return 'sr:season:' + id;
      } else if (type == 'match') {
        return 'sr:sport_event:' + id;
      } else if (type == 'team') {
        return 'sr:competitor:' + id;
      } else if (type == 'player') {
        return 'sr:player:' + id;
      }
    } else if (sport == 'basketball') {
      if (type == 'team') {
        return 'sr:team:' + id;
      } else if (type == 'player') {
        return 'sr:player:' + id;
      }
    }
  }

  convertDate(date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let mmChars = mm.split('');
    let ddChars = dd.split('');
    return yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0]);
  }

  sortByName(data, key) {
    return data.sort((a, b) => {
      if (a.key < b.key) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  initCompetitorScore(arr) {
    return arr.map((data, matchIndex) => {
      let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
      let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
      if (data.period_scores) {
        data.period_scores.map((pscore, index) => {
          if (pscore.home_score) {
            (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore);
          } else {
            (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore);
          }
        });
      }
      return data;
    });
  }


}
