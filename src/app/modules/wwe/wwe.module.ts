import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { WweComponent } from './wwe.component';
import { WweRoutingModule } from './wwe-routing.module';

@NgModule({
  declarations: [
    WweComponent
  ],

  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    WweRoutingModule,
    LazyLoadImageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})

export class WweModule { }
