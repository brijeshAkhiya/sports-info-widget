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
import { SplitPipe } from '../pipes/stringsplitpipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [TruncatePipe, CommonStoryWidgetComponent, CommonNewsListComponent, PointstableWidgetComponent,SplitPipe],
    providers: [TruncatePipe, SportsService,SplitPipe],
    exports: [NgxTinySliderModule, TruncatePipe,CommonNewsListComponent,CommonStoryWidgetComponent,PointstableWidgetComponent,SplitPipe]
})
export class SharedModule { }