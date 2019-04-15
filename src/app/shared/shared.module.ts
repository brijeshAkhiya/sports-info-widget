import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NgxTinySliderModule} from 'ngx-tiny-slider';
@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        SlickCarouselModule,
        NgxTinySliderModule
    ],
    declarations: [MainHeaderComponent,MainFooterComponent
    ],
        
        exports:[MainHeaderComponent,MainFooterComponent,NgxTinySliderModule]
  })
  export class SharedModule {}