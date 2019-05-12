import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { TruncatePipe } from '../pipes/truncatepipe';
import { ResizeImagePipe } from '../pipes/resize-image.pipe';
import { SportsService } from '../providers/sports-service';
import { MomentModule } from 'ngx-moment';
import { CommonStoryWidgetComponent } from './common-story-widget/common-story-widget.component';
import { CommonNewsListComponent } from './common-news-list/common-news-list.component';
import { PointstableWidgetComponent } from './pointstable-widget/pointstable-widget.component';
import { SplitPipe } from '../pipes/stringsplitpipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonBlogCardComponent } from './common-blog-card/common-blog-card.component';
import { CommonRelatedBlogCardComponent } from './common-related-blog-card/common-related-blog-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule
    ],
    declarations: [TruncatePipe, ResizeImagePipe,  CommonStoryWidgetComponent, CommonNewsListComponent, PointstableWidgetComponent,SplitPipe, CommonBlogCardComponent, CommonRelatedBlogCardComponent],
    providers: [TruncatePipe, ResizeImagePipe,  SportsService,SplitPipe],
    exports: [NgxTinySliderModule, TruncatePipe, ResizeImagePipe, CommonNewsListComponent,CommonStoryWidgetComponent,PointstableWidgetComponent,SplitPipe, CommonBlogCardComponent, CommonRelatedBlogCardComponent]
})
export class SharedModule { }