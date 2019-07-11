import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  users$: Observable<any>
  socialUser: any
  socialUser2: any;
  vibrantcolor: any
  mutedcolor: any
  metatagsObj = {};
  isupdate: boolean
  constructor(private http: HttpClient, private swupdate: SwUpdate, private commonservice: CommonService, private sportsservice: SportsService, private router: Router, private meta: Meta, private pagetitle: Title, private socialLoginService: AuthService, private store: Store<fromRoot.State>) {

    this.getMetaTags();
    this.swupdate.available.subscribe((res) => {
      this.isupdate = true
    })
  }

  ngOnInit() {
    //get data from ngrx store through meta tags actions
    this.store.select('Metatags').subscribe((data: any) => {
      let metadata = data.Metatags
      let metaarray = [];
      metadata.map((data) => {
        let routerUrl = data.sUrl.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')
        metaarray[routerUrl[4]] = data
      })
      this.metatagsObj = { ...metaarray }
    })

    //susbcribe to router events
    this.router.events.subscribe((event) => {
      //scroll to top navigation related
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      //change route get url 
      if (event instanceof NavigationEnd) {
        this.setmetatags(event.url);
        //set meta tags from here...
        console.log('tagsobj', this.metatagsObj);
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
      this.meta.updateTag({ name: 'title', content: data.title ? data.title : 'Sports.info' });
      this.meta.updateTag({ name: 'description', content: data.description ? data.description : 'Sports.info' });
      this.meta.updateTag({ name: 'topic', content: data.topic ? data.topic : 'Sports.info' });
      this.meta.updateTag({ name: 'subject', content: data.subject ? data.subject : 'Sports.info' });
      this.meta.updateTag({ name: 'keywords', content: data.keywords ? data.keywords : 'Sports.info' });
      this.meta.updateTag({ property: 'og:title', content: data['og:title'] ? data['og:title'] : 'Sports.info' });
      this.meta.updateTag({ property: 'og:type', content: data['og:type'] ? data['og:type'] : 'Sports.info' });
      this.meta.updateTag({ property: 'og:description', content: data['og:description'] ? data['og:description'] : 'Sports.info' });
      this.meta.updateTag({ name: 'twitter:card', content: data['twitter:card'] ? data['twitter:card'] : 'Sports.info' });
    }
    else {
      this.meta.updateTag({ name: 'title', content: 'Sports.info' });
      this.meta.updateTag({ name: 'description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
      this.meta.updateTag({ name: 'topic', content: 'Sports.info' });
      this.meta.updateTag({ name: 'subject', content: 'Sports.info' });
      this.meta.updateTag({ name: 'keywords', content: 'Sports.info' });
      this.meta.updateTag({ property: 'og:title', content: 'Sports.info' });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:description', content: 'Sports.info | Cricket unites, but is there no world beyond? Sports.info brings the experience of a world beyond cricket!' });
      this.meta.updateTag({ name: 'twitter:card', content: 'Sports.info' });
    }

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
