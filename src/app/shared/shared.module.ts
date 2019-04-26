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
import { CommonStoryWidgetComponent } from './common-story-widget/common-story-widget.component';
import { CommonNewsListComponent } from './common-news-list/common-news-list.component';
import { PointstableWidgetComponent } from './pointstable-widget/pointstable-widget.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule
    ],
    declarations: [TruncatePipe, CommonStoryWidgetComponent, CommonNewsListComponent, PointstableWidgetComponent],
    providers: [TruncatePipe, SportsService],
    exports: [NgxTinySliderModule, TruncatePipe,CommonNewsListComponent,CommonStoryWidgetComponent,PointstableWidgetComponent]
})
export class SharedModule { }