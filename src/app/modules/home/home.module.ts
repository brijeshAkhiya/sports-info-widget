import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

/** Extrernal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MomentModule } from 'ngx-moment';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CarouselModule } from 'ngx-owl-carousel-o';

/** Internal Modules */
import { SharedModule } from "@app/shared/shared.module";
import { CricketModule } from "@app/modules/cricket/cricket.module";

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,

    LazyLoadImageModule,
    MomentModule,
    CarouselModule,
    NgScrollbarModule,
    TranslateModule,
    HomeRoutingModule,
    SharedModule,
    CricketModule,
  ]
})
export class HomeModule { }
