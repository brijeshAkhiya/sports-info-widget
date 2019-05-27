import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { SocketIoModule} from 'ngx-socket-io';
import { TruncatePipe } from '../pipes/truncatepipe';
import { ResizeImagePipe } from '../pipes/resize-image.pipe';
import { SportsService } from '../providers/sports-service';
import { SocketService } from '../providers/socket.service';
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
import { CustomAdsWidgetComponent } from './custom-ads-widget/custom-ads-widget.component';
import { StripHtmlPipe } from '../pipes/striphtmlpipe';
import { NoDataWidgetComponent } from './no-data-widget/no-data-widget.component';
import { DataLoaderWidgetComponent } from './data-loader-widget/data-loader-widget.component';
import { FlashCommentaryComponent } from './flash-commentary/flash-commentary.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        SocketIoModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule
    ],
    declarations: [TruncatePipe, ResizeImagePipe, StripHtmlPipe, CommonStoryWidgetComponent, CommonNewsListComponent, PointstableWidgetComponent,SplitPipe, CommonBlogCardComponent, CommonRelatedBlogCardComponent, CustomAdsWidgetComponent, NoDataWidgetComponent, DataLoaderWidgetComponent, FlashCommentaryComponent],
    providers: [TruncatePipe, ResizeImagePipe,SportsService,SocketService,SplitPipe],
    exports: [NgxTinySliderModule, TruncatePipe, ResizeImagePipe,StripHtmlPipe ,CommonNewsListComponent,CommonStoryWidgetComponent,PointstableWidgetComponent,SplitPipe, CommonBlogCardComponent, CommonRelatedBlogCardComponent,CustomAdsWidgetComponent,NoDataWidgetComponent,DataLoaderWidgetComponent,FlashCommentaryComponent]
})
export class SharedModule { }