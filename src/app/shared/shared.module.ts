/** Core Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Extrernal Modules */
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { SocketIoModule} from 'ngx-socket-io';
import { ClickOutsideModule } from 'ng-click-outside';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';

/** All Pipes */
import { TruncatePipe } from './pipes/truncatepipe';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { SplitPipe } from './pipes/stringsplitpipe';
import { StripHtmlPipe } from './pipes/striphtmlpipe';
import { LogosUrlPipe } from './pipes/logosurlpipe';
import { PlayerImagePipe } from '@app/shared/pipes/playerimageurl.pipe';

/** All Providers*/
import { SportsService } from './providers/sports-service';
import { CommonService } from './providers/common-service';
import { CricketService } from './providers/cricket-service';
import { SocketService } from './providers/socket.service';

/** All Componenets */
import { ContentComponent } from './widget/content/content.component';
import { BlogComponent } from './widget/blog/blog.component';
import { CustomAdsWidgetComponent } from './widget/custom-ads-widget/custom-ads-widget.component';
import { NoDataWidgetComponent } from './widget/no-data-widget/no-data-widget.component';

import { CommonStoryWidgetComponent } from './common-story-widget/common-story-widget.component';
import { CommonNewsListComponent } from './common-news-list/common-news-list.component';
import { PointstableWidgetComponent } from './cricket/pointstable-widget/pointstable-widget.component';
import { CommonBlogCardComponent } from './common-blog-card/common-blog-card.component';
import { CommonRelatedBlogCardComponent } from './common-related-blog-card/common-related-blog-card.component';
import { DataLoaderWidgetComponent } from './data-loader-widget/data-loader-widget.component';
import { FlashCommentaryComponent } from './flash-commentary/flash-commentary.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        ClickOutsideModule,
        SocketIoModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule
    ],
    declarations: [
        /** All Pipes */
        TruncatePipe,
        ResizeImagePipe,
        LogosUrlPipe,
        PlayerImagePipe, 
        StripHtmlPipe, 
        SplitPipe, 

        /** All Componenets */
        CommonStoryWidgetComponent, 
        CommonNewsListComponent, 
        PointstableWidgetComponent,
        CommonBlogCardComponent, 
        CommonRelatedBlogCardComponent, 
        CustomAdsWidgetComponent, 
        NoDataWidgetComponent, 
        DataLoaderWidgetComponent, 
        FlashCommentaryComponent, 
        ContentComponent, 
        BlogComponent
    ],
    providers: [
        /** All Pipes */
        TruncatePipe, 
        ResizeImagePipe,
        SplitPipe,
        LogosUrlPipe,

        /** All Providers*/
        SportsService,
        SocketService,
        CommonService, 
        CricketService
    ],
    exports: [
        NgxTinySliderModule, 

        /** All Pipes */
        TruncatePipe,
        LogosUrlPipe,
        PlayerImagePipe, 
        ResizeImagePipe,
        StripHtmlPipe,
        SplitPipe,
        
        /** All Componenets */
        CommonNewsListComponent,
        CommonStoryWidgetComponent,
        PointstableWidgetComponent,
        CommonBlogCardComponent, 
        CommonRelatedBlogCardComponent,
        CustomAdsWidgetComponent,
        NoDataWidgetComponent,
        DataLoaderWidgetComponent,
        FlashCommentaryComponent, 
        ContentComponent,
        BlogComponent
    ]

})
export class SharedModule { }