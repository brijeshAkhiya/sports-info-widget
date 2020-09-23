/** Angular Core Modules */
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** External Modules */

import { AgmCoreModule } from '@agm/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { MomentModule } from 'ngx-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdsenseModule } from 'ng2-adsense';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/* store configuration modules import */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app-reducer';
import { effects } from './app-effects';

/** All  Internal Modules */
import { SharedModule } from './shared/shared.module';

/** Routing and Other */
// import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

/** All Components */
import { AppComponent } from './app.component';

import { EffectsModule } from '@ngrx/effects';



/* socket config */
const config: SocketIoConfig = { url: environment.socket.baseUrl, options: {} };


// const googleLoginOptions: LoginOpt = {
//   client_id: '504140892785-j5u4ed8b9rv3vl2ibvto9c1hljqg05sg.apps.googleusercontent.com',
//   scope: 'profile email',
//   ux_mode: 'redirect',
//   redirect_uri: environment.siteUrl
// }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


/* social login firebase */




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6381087658260439',
      adSlot: 7259870550,
    }),
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
    }),
    BrowserAnimationsModule,
    // AppRoutingModule,
    SharedModule,
    MomentModule,
    ClickOutsideModule,
    LazyLoadImageModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    // tslint:disable-next-line: deprecation
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    }),
    InfiniteScrollModule
  ],
  providers: [
  ],
  schemas: [],
  bootstrap: [AppComponent]


})
export class AppModule { }
