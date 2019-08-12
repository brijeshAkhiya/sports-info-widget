import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'
import { Meta, Title } from '@angular/platform-browser';

import { filter } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import * as MetaTags from "./store/meta-tags-management/meta-tags.actions";
import * as fromRoot from './app-reducer'
import * as Auth from './store/auth/auth.actions';
import { environment } from "@env";
import {TranslateService} from '@ngx-translate/core';

/** Providers */
import { CommonService } from "@providers/common-service";
import { SportsService } from "@providers/sports-service";
import { SwUpdate } from '@angular/service-worker';

//vibrant import 
// declare var Vibrant: any;
// import '../assets/js/vibrant.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentInit {
  users$: Observable<any>
  socialUser: any
  socialUser2: any;
  vibrantcolor: any
  mutedcolor: any
  metatagsObj = {};
  isupdate: boolean
  constructor(
    private http: HttpClient, 
    private swupdate: SwUpdate, 
    private commonservice: CommonService, 
    private sportsservice: SportsService, 
    private router: Router, 
    private meta: Meta, 
    private pagetitle: Title, 
    private socialLoginService: AuthService, 
    private store: Store<fromRoot.State>,
    private translate: TranslateService
    ) {

    this.getMetaTags();
    this.swupdate.available.subscribe((res) => {
      this.isupdate = true
    })
  }

  ngOnInit() {    

    let selectedLang = 'english' //bengali //(window.location.host != 'www.sports.info' && window.location.host != 'dev.sports.info') ? window.location.host.split('.')[0] : 'english';
    console.log(selectedLang)
    this.translate.setDefaultLang(selectedLang);

    //get data from ngrx store through meta tags actions
    
    //susbcribe to router events
    this.router.events.subscribe((event) => {
      //scroll to top navigation related
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      //change route get url 
      if (event instanceof NavigationEnd) {
        // console.log("event", event, event.url.includes('/article'));
        if(event.url != '/' && (!event.url.includes('/article') && !event.url.includes('/video') && !event.url.includes('/blog')))        
          this.setmetatags(event.url);
        //set meta tags from here...
        // console.log('tagsobj', this.metatagsObj);
        //set page title 
        let title = this.commonservice.getPagetitlebyurl(event.url);
        if (title != null) {
          this.pagetitle.setTitle(title);
        }
      }
    })
  }

  setmetatags(routerURL) {
    console.log('routee', routerURL);

    let data = this.metatagsObj[routerURL]
    if (data) {
      if(data.title){
        this.meta.updateTag({ name: 'title', content: data.title });
        this.meta.updateTag({ property: 'og:title', content: data.title });
        this.meta.updateTag({ name: 'twitter:title', content: data.title });
      }
      this.meta.updateTag({ name: 'keywords', content: data.keywords ? data.keywords : 'Cricket, Kabaddi, Soccer, Bad Minton, BasketBall, Field Hockey, Racing, Tennis Sports' });
      
      if(data.description){
        this.meta.updateTag({ name: 'description', content: data.description });
        this.meta.updateTag({ name: 'og:description', content: data.description });
        this.meta.updateTag({ name: 'twitter:description', content: data.description });
      }
      if(data.image){
        this.meta.updateTag({ name: 'twitter:image', content: data.image });
        this.meta.updateTag({ name: 'twitter:image:src', content: data.image });
        this.meta.updateTag({ name: 'og:image', content: data.image });
      }
      if(data.topic)
        this.meta.updateTag({ name: 'topic', content:  data.topic  });
      if(data.subject)
        this.meta.updateTag({ name: 'subject', content: data.subject  });
      if(data['og:type'])
        this.meta.updateTag({ property: 'og:type', content: data['og:type']  });
      if(data['twitter:card'])
        this.meta.updateTag({ name: 'twitter:card', content: data['twitter:card'] });
    }
    // else {
    //   this.meta.updateTag({ name: 'title', content: 'Sports.info' });
    //   this.meta.updateTag({ name: 'description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
    //   this.meta.updateTag({ name: 'topic', content: 'Sports.info' });
    //   this.meta.updateTag({ name: 'subject', content: 'Sports.info' });
    //   this.meta.updateTag({ name: 'keywords', content: 'Sports.info' });
    //   this.meta.updateTag({ property: 'og:title', content: 'Sports.info' });
    //   this.meta.updateTag({ property: 'og:type', content: 'article' });
    //   this.meta.updateTag({ property: 'og:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
    //   this.meta.updateTag({ name: 'twitter:card', content: 'Sports.info' });
    // }

  }

  //get meta tags 
  getMetaTags() {
    this.sportsservice.getmetatags().subscribe((res: any) => {
      if (res.data.length > 0) {
        this.store.dispatch(new MetaTags.SaveMetaTags(res.data));
      }
    })
  }

  updatewebsite() {
    this.isupdate = false
    window.location.reload(true);
  }

  ngAfterContentInit(){
    this.store.select('Metatags').subscribe((data: any) => {
      let metadata = data.MetaTags
      let metaarray = [];
      metadata.map((data) => {
        let routerUrl = data.sUrl.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')
        metaarray[routerUrl[4]] = data
      })
      this.metatagsObj = { ...metaarray }
    })
  }

  // myfn(){
  //   const ele:HTMLImageElement = <HTMLImageElement>document.getElementById('img');

  //   var vibrant = new Vibrant(ele);
  //   var swatches = vibrant.swatches()


  //   for (var swatch in swatches){
  //       if (swatches.hasOwnProperty(swatch) && swatches[swatch] && swatch == "Vibrant"){
  //           console.log(swatch, swatches[swatch].getHex())

  //           this.vibrantcolor = swatches[swatch].getHex();
  //           console.log('vibrant',this.vibrantcolor);


  //       }
  //       if (swatches.hasOwnProperty(swatch) && swatches[swatch] && swatch == "DarkMuted"){
  //         console.log(swatch, swatches[swatch].getHex())

  //         this.mutedcolor = swatches[swatch].getHex();
  //         console.log('muted',this.mutedcolor);


  //     }
  //          // console.log('111',swatches[swatch].getHex()[0]);
  //   }    
  // }


}
