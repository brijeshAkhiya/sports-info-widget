import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

/** Extrernal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MomentModule } from 'ngx-moment';
import { NgScrollbarModule } from 'ngx-scrollbar';

/** Internal Modules */
import { SharedModule } from "@app/shared/shared.module";
import { CricketModule } from "@app/modules/cricket/cricket.module";

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,

    LazyLoadImageModule,
    MomentModule,
    NgScrollbarModule,

    HomeRoutingModule,
    SharedModule,
    CricketModule,
  ]
})
export class HomeModule { }
