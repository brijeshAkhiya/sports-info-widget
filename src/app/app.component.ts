import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Meta, Title } from '@angular/platform-browser';

import * as MetaTags from './store/meta-tags-management/meta-tags.actions';
import * as fromRoot from './app-reducer';
import { TranslateService } from '@ngx-translate/core';

/** Providers */
import { CommonService } from '@providers/common-service';
import { SportsService } from '@providers/sports-service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterContentInit {
  metatagsObj = {};
  isupdate: boolean;
  showCookiepopup = false;

  constructor(
    private swupdate: SwUpdate,
    private commonservice: CommonService,
    private sportsservice: SportsService,
    private router: Router,
    private meta: Meta,
    private pagetitle: Title,
    private store: Store<fromRoot.State>,
    private translate: TranslateService
  ) {
    this.getMetaTags();
    this.swupdate.available.subscribe((res) => {
      this.isupdate = true;
    });
    if (!this.readCookie('iscookieenabled')) {
      this.showCookiepopup = true;
      document.cookie = 'iscookieenabled=true ; expires=Thu, 31 Dec 2050 12:00:00 UTC';
    } else {
      this.showCookiepopup = false;
    }
  }

  ngOnInit() {

    let selectedLang = 'english';
    if ((window.location.host != 'www.sports.info'
      && window.location.host != 'dev.sports.info'
      && !window.location.host.includes('localhost')
      && !window.location.host.includes('192.168')
      && !window.location.host.includes('127.0.0.1'))) {
      if (window.location.host.split('.')[0])
        selectedLang = window.location.host.split('.')[0];
    }
    let element = document.getElementById('main-body');
    if (selectedLang === 'arabic' && element != null) {
      element.classList.add('arabic');
    }
    /* //save language to localstorage */
    localStorage.setItem('userLng', selectedLang);
    this.translate.setDefaultLang(selectedLang);

    /* //get data from ngrx store through meta tags actions */

    /*  //susbcribe to router events */
    this.router.events.subscribe((event) => {
      /*  //scroll to top navigation related */
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      /* //change route get url */
      if (event instanceof NavigationEnd) {
        if ((!event.url.includes('/article') && !event.url.includes('/video') && !event.url.includes('/blog')))
          this.setmetatags(event.url);
        /*         //set meta tags from here... */
        /*         //set page title */
        let title = this.commonservice.getPagetitlebyurl(event.url);
        if (title != null) {
          this.pagetitle.setTitle(title);
        }
      }
    });
  }

  setmetatags(routerURL) {
    let data = this.metatagsObj[routerURL];
    if (!data) {
      data = this.metatagsObj['/'];
    }

    if (data) {
      if (data.title) {
        this.meta.updateTag({ name: 'title', content: data.title });
        this.meta.updateTag({ property: 'og:title', content: data.title });
        this.meta.updateTag({ name: 'twitter:title', content: data.title });
      }
      this.meta.updateTag(
        {
          name: 'keywords', content: data.keywords ?
            data.keywords :
            'Cricket, Kabaddi, Soccer, Bad Minton, BasketBall, Field Hockey, Racing, Tennis Sports'
        });

      if (data.description) {
        this.meta.updateTag({ name: 'description', content: data.description });
        this.meta.updateTag({ name: 'og:description', content: data.description });
        this.meta.updateTag({ name: 'twitter:description', content: data.description });
      }
      if (data.image) {
        this.meta.updateTag({ name: 'twitter:image', content: data.image });
        this.meta.updateTag({ name: 'twitter:image:src', content: data.image });
        this.meta.updateTag({ name: 'og:image', content: data.image });
      }
      if (data.topic)
        this.meta.updateTag({ name: 'topic', content: data.topic });
      if (data.subject)
        this.meta.updateTag({ name: 'subject', content: data.subject });
      if (data['og:type'])
        this.meta.updateTag({ property: 'og:type', content: data['og:type'] });
      if (data['twitter:card'])
        this.meta.updateTag({ name: 'twitter:card', content: data['twitter:card'] });
    } else {
      this.meta.updateTag({ name: 'title', content: 'title' });
      this.meta.updateTag({ property: 'og:title', content: 'title' });
      this.meta.updateTag({ name: 'twitter:title', content: 'title' });
      this.meta.updateTag({ name: 'keywords', content: 'Sports.info' });
      this.meta.updateTag({ name: 'description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
      this.meta.updateTag({ name: 'og:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
      this.meta.updateTag({ name: 'twitter:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
      this.meta.updateTag({ name: 'twitter:image', content: 'https://sports.info/assets/images/logo.svg' });
      this.meta.updateTag({ name: 'twitter:image:src', content: 'https://sports.info/assets/images/logo.svg' });
      this.meta.updateTag({ name: 'og:image', content: 'https://sports.info/assets/images/logo.svg' });
      this.meta.updateTag({ name: 'topic', content: 'Sports.info' });
      this.meta.updateTag({ name: 'subject', content: 'Sports.info' });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    }
  }

  /* //get cookie by name */
  readCookie(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }


  /* //get meta tags */
  getMetaTags() {
    this.sportsservice.getmetatags().subscribe((res: any) => {
      if (res.data.length > 0) {
        this.store.dispatch(new MetaTags.SaveMetaTags(res.data));
      }
    });
  }

  updatewebsite() {
    this.isupdate = false;
    window.location.reload(true);
  }

  ngAfterContentInit() {
    this.store.select('Metatags').subscribe((data: any) => {
      let metadata = data.MetaTags;
      let metaarray = [];
      metadata.map((data) => {
        // tslint:disable-next-line: max-line-length
        let routerUrl = data.sUrl.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
        if (routerUrl != null && routerUrl[4] !== undefined)
          metaarray[routerUrl[4]] = data;
        else
          metaarray['/'] = data;
      });
      this.metatagsObj = { ...metaarray };
    });
  }
}
