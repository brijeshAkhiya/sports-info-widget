import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

import { RouterModule } from '@angular/router';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { TruncatePipe } from '../pipes/truncatepipe';
import { SportsService } from '../providers/sports-service';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule
    ],
    declarations: [MainHeaderComponent, MainFooterComponent, TruncatePipe],
    providers: [TruncatePipe,SportsService],
    exports: [MainHeaderComponent, MainFooterComponent, NgxTinySliderModule, TruncatePipe]
})
export class SharedModule { }