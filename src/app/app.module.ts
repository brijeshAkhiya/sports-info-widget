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
import { AdsenseModule } from 'ng2-adsense';

//store configuration modules import
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers } from "./app-reducer";


/** All  Internal Modules */
import { SharedModule } from "./shared/shared.module";

/** Routing and Other */
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";

/** All Components */
import { AppComponent } from "./app.component";
import { ComingSoonComponent } from "./pages/coming-soon/coming-soon.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { CmsContentComponent } from './pages/cms-content/cms-content.component';
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AdvertiseWithUsComponent } from "./pages/advertise-with-us/advertise-with-us.component";

import { MainHeaderComponent } from "./shared/main-header/main-header.component";
import { MainFooterComponent } from "./shared/main-footer/main-footer.component";
import { WriterProfileComponent } from "./components/writer/writer-profile/writer-profile.component";


//socket config
const config: SocketIoConfig = { url: environment.socket.baseUrl, options: {} };

//social login firebase
let authconfig = new AuthServiceConfig([
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

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    PageNotFoundComponent,
    CmsContentComponent,
    AboutComponent,
    ContactComponent,
    AdvertiseWithUsComponent,
    
    MainHeaderComponent,
    MainFooterComponent,
    WriterProfileComponent,
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
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
