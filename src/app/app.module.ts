import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { MainHeaderComponent } from "./shared/main-header/main-header.component";
import { MainFooterComponent } from "./shared/main-footer/main-footer.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
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
import { AgmCoreModule } from '@agm/core';
import { LottieAnimationViewModule } from 'ng-lottie';
//store configuration modules import
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers } from "./app-reducer";
import { SlugifyPipe } from "./pipes/slugpipe";
import { TruncatePipe } from "./pipes/truncatepipe";

import { SharedModule } from "./shared/shared.module";
import { MomentModule } from "ngx-moment";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SplitPipe } from "./pipes/stringsplitpipe";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { WriterProfileComponent } from './components/writer/writer-profile/writer-profile.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { AboutComponent } from './components/static-pages/about/about.component';
import { ContactComponent } from './components/static-pages/contact/contact.component';
import { AdvertiseWithUsComponent } from './components/static-pages/advertise-with-us/advertise-with-us.component';
import { TermsAndConditionsComponent } from './components/static-pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/static-pages/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


let config = new AuthServiceConfig([
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
  return config;
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
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MomentModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjnz5zvaRF5aMwMcsZ2-5nm43B9Hs3KhY'
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
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
