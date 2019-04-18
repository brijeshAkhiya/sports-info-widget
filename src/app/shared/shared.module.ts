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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CricketMenuComponent } from './cricket-menu/cricket-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MomentModule,
        NgxTinySliderModule,
        CarouselModule
        
    ],
    declarations: [MainHeaderComponent, MainFooterComponent, TruncatePipe,CricketMenuComponent],
    providers: [TruncatePipe,SportsService],
    exports: [MainHeaderComponent, MainFooterComponent, NgxTinySliderModule, TruncatePipe,CricketMenuComponent]
})
export class SharedModule { }