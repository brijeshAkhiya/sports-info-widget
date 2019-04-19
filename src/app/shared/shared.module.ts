import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { TruncatePipe } from '../pipes/truncatepipe';
import { SportsService } from '../providers/sports-service';
import { MomentModule } from 'ngx-moment';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
    ],
    declarations: [TruncatePipe],
    providers: [TruncatePipe, SportsService],
    exports: [NgxTinySliderModule, TruncatePipe]
})
export class SharedModule { }