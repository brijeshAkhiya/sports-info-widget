/** Angular Core Modules */
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** External Modules */
import {
  SocialLoginModule,
  AuthServiceConfig,
  AuthService,
  LoginOpt
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
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
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

/** All Components */
import { AppComponent } from './app.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { CmsContentComponent } from './pages/cms-content/cms-content.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdvertiseWithUsComponent } from './pages/advertise-with-us/advertise-with-us.component';
import { BlogsComponent } from './pages/blogs/blogs.component';

import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { BlogViewComponent } from './pages/blogs/blog-view/blog-view.component';
import { WriterComponent } from './pages/writer/writer.component';
import { LoginModalComponent } from './shared/widget/login-modal/login-modal.component';
import { EffectsModule } from '@ngrx/effects';

import { AppInterceptor } from './shared/providers/app.interceptor';
import { TranslateBrowserLoader } from './translate-browser-loader.service';

import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { SchemaComponent } from './shared/schema/schema.component';


/* socket config */
const config: SocketIoConfig = { url: environment.socket.baseUrl, options: {} };


// const googleLoginOptions: LoginOpt = {
//   client_id: '504140892785-j5u4ed8b9rv3vl2ibvto9c1hljqg05sg.apps.googleusercontent.com',
//   scope: 'profile email',
//   ux_mode: 'redirect',
//   redirect_uri: environment.siteUrl
// }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


/* social login firebase */
const authconfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      environment.googleOuthId
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookId)
  }
]);

export function provideConfig() {
  return authconfig;
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n_v2_5/', '.json');
}
export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n_v2_5/', '.json', transferState, http);
}


@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    CmsContentComponent,
    AboutComponent,
    ContactComponent,
    AdvertiseWithUsComponent,
    BlogsComponent,
    MainHeaderComponent,
    MainFooterComponent,
    BlogViewComponent,
    WriterComponent,
    SchemaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxJsonLdModule,
    BrowserTransferStateModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6381087658260439',
      adSlot: 7259870550,
    }),
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      // loader: {
      //   provide: TranslateLoader,
      //   useFactory: (createTranslateLoader),
      //   deps: [HttpClient]
      // }
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient, TransferState]
      },
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
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
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]


})
export class AppModule { }
