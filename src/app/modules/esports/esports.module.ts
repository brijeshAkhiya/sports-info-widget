import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ESportsRoutingModule } from './esports-routing.module';
import { EsportsComponent } from './esports/esports.component';


@NgModule({
  declarations: [
    EsportsComponent
  ],

  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    ESportsRoutingModule,
    LazyLoadImageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class EsportsModule { }
