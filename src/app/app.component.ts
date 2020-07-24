import { Component, OnInit, AfterContentInit, Injector, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  metatagsObj = {};
  isupdate: boolean;
  showCookiepopup = false;
  requestedUrl;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private swupdate: SwUpdate,
    private commonService: CommonService,
    private sportsservice: SportsService,
    private router: Router,
    private meta: Meta,
    private pagetitle: Title,
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.getMetaTags();
    this.swupdate.available.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.isupdate = true;
    });
    if (isPlatformBrowser(this.platformId)) {
      if (!this.readCookie('iscookieenabled')) {
        this.showCookiepopup = true;
        document.cookie = 'iscookieenabled=true ; expires=Thu, 31 Dec 2050 12:00:00 UTC; Secure; SameSite=None; ';
      } else {
        this.showCookiepopup = false;
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {

    let selectedLang = 'english';
    let host;
    if (isPlatformServer(this.platformId)) {
      host = this.injector.get('req') ? this.injector.get('req').headers.host : 'www.sports.info';
    } else {
      host = window.location.host;
    }
    this.commonService.siteUrl = `https://${host}/`;
    // console.log(this.injector.get('req').headers);
    let splitedHost = host.split('.')[0];
    if ((host != 'www.sports.info'
      && host != 'dev.sports.info'
      && !host.includes('localhost')
      && !host.includes('192.168')
      && !host.includes('127.0.0.1'))) {
      if (splitedHost
        && ['temp', 'english', 'arabic', 'bengali', 'brazil', 'colombia', 'french', 'gujarati', 'hindi', 'italian', 'marathi', 'mexico', 'portugal', 'russia', 'spain', 'telugu'].includes(splitedHost))
        selectedLang = splitedHost;
      else
        selectedLang = host.includes('192.168.11.31:5500') ? 'hindi' : selectedLang;
    }
    let element = document.getElementById('main-body');
    if (selectedLang === 'arabic' && element != null) {
      element.classList.add('arabic');
    }
    this.translate.setDefaultLang(selectedLang);

    /* //get data from ngrx store through meta tags actions */
    if (isPlatformServer(this.platformId)) {
      this.requestedUrl = this.injector.get('req').url;
      // if (!(requestUrl.match('^(?:[^/][\d\w\s\.\\.\-:]+)$(?<=\.\w{2,4})$'))) {
      //   this.requestedUrl = requestUrl;
      //   this.setmetatags(requestUrl);
      // }
    } else {
      /* //save language to localstorage */
      this.commonService.setInStorage('userLng', selectedLang);
    }
    /* //get data from ngrx store through meta tags actions */

    /*  //susbcribe to router events */
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      /*  //scroll to top navigation related */
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      if (isPlatformBrowser(this.platformId))
        window.scrollTo(0, 0);
      /* //change route get url */
      if (event instanceof NavigationEnd) {
        if ((!event.url.includes('/article') && !event.url.includes('/video') && !event.url.includes('/blog')))
          this.setmetatags(event.url);
        /*         //set meta tags from here... */
        /*         //set page title */
        let title = this.commonService.getPagetitlebyurl(event.url);
        if (title != null) {
          this.pagetitle.setTitle(title);
        }
      }
    });
  }

  setmetatags(routerURL) {
    let image = "https://dev.sports.info/assets/images/sports-info.jpg";
    this.getBestMatchedUrl(routerURL).then(
      (data: any) => {
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
            image = this.commonService.isUrl(data.image) ? data.image : this.commonService.s3Url + data.image;
          }
          this.meta.updateTag({ name: 'twitter:image', content: image });
          this.meta.updateTag({ name: 'twitter:image:src', content: image });
          this.meta.updateTag({ name: 'og:image', content: image });

          if (data.topic)
            this.meta.updateTag({ name: 'topic', content: data.topic });
          if (data.subject)
            this.meta.updateTag({ name: 'subject', content: data.subject });
          if (data['og:type'])
            this.meta.updateTag({ property: 'og:type', content: data['og:type'] });
          if (data['twitter:card'])
            this.meta.updateTag({ name: 'twitter:card', content: data['twitter:card'] });
        } else if (isPlatformBrowser(this.platformId)) {
          this.setDefaultMetaFields(image);
        }
      }
    ).catch(e => {
      this.setDefaultMetaFields(image);
    });
  }

  setDefaultMetaFields(image) {
    this.meta.updateTag({ name: 'title', content: 'title' });
    this.meta.updateTag({ property: 'og:title', content: 'title' });
    this.meta.updateTag({ name: 'twitter:title', content: 'title' });
    this.meta.updateTag({ name: 'keywords', content: 'Sports.info' });
    this.meta.updateTag({ name: 'description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
    this.meta.updateTag({ name: 'og:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:src', content: image });
    this.meta.updateTag({ name: 'og:image', content: image });
    this.meta.updateTag({ name: 'mimage', content: image });
    this.meta.updateTag({ name: 'topic', content: 'Sports.info' });
    this.meta.updateTag({ name: 'subject', content: 'Sports.info' });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
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
    this.sportsservice.getmetatags().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
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
    this.store.select('Metatags').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
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
      if (Object.keys(this.metatagsObj).length != 0 && this.requestedUrl)
        this.setmetatags(this.requestedUrl);
    });
  }

  getBestMatchedUrl(url) {
    return new Promise((resolve, reject) => {
      try {
        if (Object.keys(this.metatagsObj).length == 0) reject();
        if (this.metatagsObj[url]) {
          resolve(this.metatagsObj[url]);
        } else if (url) {
          this.getBestMatchedUrl(url.replace(new RegExp(url.substr(url.lastIndexOf('/')) + '$'), '')).then(resolve).catch(reject);
        } else if (this.metatagsObj['/']) {
          resolve(this.metatagsObj['/']);
        } else {
          reject();
        }
      }
      catch (e) {
        console.log(e); reject(e);
      }
    });
  }
}
