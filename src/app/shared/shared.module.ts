/** Core Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Extrernal Modules */
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { SocketIoModule } from 'ngx-socket-io';
import { ClickOutsideModule } from 'ng-click-outside';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LottieAnimationViewModule } from 'ng-lottie';
import { TranslateModule } from '@ngx-translate/core';

/** All Pipes */
import { LogosUrlPipe } from './pipes/logosurlpipe';
import { CricketScorePipe } from './pipes/cricket-score.pipe';

/** All Providers*/
import { SportsService } from './providers/sports-service';
import { CommonService } from './providers/common-service';

/** All Componenets */


import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgxJsonLdModule } from '@ngx-lite/json-ld';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        ClickOutsideModule,
        SocketIoModule,
        AgmCoreModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule,
        CarouselModule,
        LottieAnimationViewModule,
        TranslateModule,
        ScrollingModule,
        NgxJsonLdModule
    ],
    declarations: [
        /** All Pipes */
        LogosUrlPipe,
        CricketScorePipe,
        /** All Componenets */
    ],
    providers: [
        /** All Pipes */
        LogosUrlPipe,
        CricketScorePipe,
        /** All Providers*/
        SportsService,
        CommonService
    ],
    exports: [
        NgxTinySliderModule,

        /** All Pipes */
        LogosUrlPipe,
        LogosUrlPipe,
        CricketScorePipe,
        /** All Componenets */
    ],
    entryComponents: [],

})
export class SharedModule { }
