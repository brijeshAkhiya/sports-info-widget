/** Angular Core Modules */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


/** External Modules */
import {
  SocialLoginModule, 
  AuthServiceConfig,
  AuthService
} from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login";
import { AgmCoreModule } from "@agm/core";
import { LottieAnimationViewModule } from "ng-lottie";
import { MomentModule } from "ngx-moment";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { ClickOutsideModule } from 'ng-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//store configuration modules import
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers } from "./app-reducer";


/** All  Internal Modules */
import { SharedModule } from "./shared/shared.module";

/** Routing and Other */
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";

/** All Pipes */
import { SlugifyPipe } from "./shared/pipes/slugpipe";
import { TruncatePipe } from "./shared/pipes/truncatepipe";
import { SplitPipe } from "./shared/pipes/stringsplitpipe";
import { StripHtmlPipe } from "./shared/pipes/striphtmlpipe";

/** All Components */
import { AppComponent } from "./app.component";
import { MainHeaderComponent } from "./shared/main-header/main-header.component";
import { MainFooterComponent } from "./shared/main-footer/main-footer.component";
import { WriterProfileComponent } from "./components/writer/writer-profile/writer-profile.component";
import { ComingSoonComponent } from "./components/coming-soon/coming-soon.component";
import { AboutComponent } from "./components/static-pages/about/about.component";
import { ContactComponent } from "./components/static-pages/contact/contact.component";
import { AdvertiseWithUsComponent } from "./components/static-pages/advertise-with-us/advertise-with-us.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { CmsContentComponent } from './components/static-pages/cms-content/cms-content.component';
import { AdsenseModule } from 'ng2-adsense';


//socket config
const config: SocketIoConfig = { url: environment.socket.baseUrl, options: {} };

//social login firebase
let authconfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "723460561549-2lf3m0h9so2q6efmug8jf4vqvf20efvo.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("403916956862597")
  }
]);

export function provideConfig() {
  return authconfig;
}

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    SlugifyPipe,
    WriterProfileComponent,
    ComingSoonComponent,
    AboutComponent,
    ContactComponent,
    AdvertiseWithUsComponent,
    CmsContentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6381087658260439',
      adSlot: 7259870550,
    }),
    SocketIoModule.forRoot(config),
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
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    })
  ],
  providers: [
    AuthService,
    SplitPipe,
    TruncatePipe,
    SlugifyPipe,
    StripHtmlPipe,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
