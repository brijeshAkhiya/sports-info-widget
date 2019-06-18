/** Core Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Extrernal Modules */
import { NgxTinySliderModule } from 'ngx-tiny-slider';
import { SocketIoModule } from 'ngx-socket-io';
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
import { FlashteamPipe } from "./pipes/flashteamsname.pipe";

/** All Providers*/
import { SportsService } from '../providers/sports-service';
import { CommonService } from '../providers/common-service';
import { CricketService } from '../providers/cricket-service';
import { SocketService } from '../providers/socket.service';

/** All Componenets */
import { CommonStoryWidgetComponent } from './common-story-widget/common-story-widget.component';
import { CommonNewsListComponent } from './common-news-list/common-news-list.component';
import { PointstableWidgetComponent } from './cricket/pointstable-widget/pointstable-widget.component';
import { CommonBlogCardComponent } from './common-blog-card/common-blog-card.component';
import { CommonRelatedBlogCardComponent } from './common-related-blog-card/common-related-blog-card.component';
import { CustomAdsWidgetComponent } from './custom-ads-widget/custom-ads-widget.component';
import { NoDataWidgetComponent } from './no-data-widget/no-data-widget.component';
import { DataLoaderWidgetComponent } from './data-loader-widget/data-loader-widget.component';
import { FlashCommentaryComponent } from './flash-commentary/flash-commentary.component';
import { ContentComponent } from './widget/content/content.component';


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
        TruncatePipe,
        ResizeImagePipe,
        LogosUrlPipe,
        PlayerImagePipe,
        FlashteamPipe,
        StripHtmlPipe,
        CommonStoryWidgetComponent,
        CommonNewsListComponent,
        PointstableWidgetComponent,
        SplitPipe,
        CommonBlogCardComponent,
        CommonRelatedBlogCardComponent,
        CustomAdsWidgetComponent,
        NoDataWidgetComponent,
        DataLoaderWidgetComponent,
        FlashCommentaryComponent,
        ContentComponent
    ],
    providers: [
        TruncatePipe,
        ResizeImagePipe,
        FlashteamPipe,
        SportsService,
        SocketService,
        SplitPipe,
        LogosUrlPipe,
        CommonService,
        CricketService
    ],
    exports: [
        NgxTinySliderModule,
        TruncatePipe,
        LogosUrlPipe,
        PlayerImagePipe,
        ResizeImagePipe,
        FlashteamPipe,
        StripHtmlPipe,
        CommonNewsListComponent,
        CommonStoryWidgetComponent,
        PointstableWidgetComponent,
        SplitPipe,
        CommonBlogCardComponent,
        CommonRelatedBlogCardComponent,
        CustomAdsWidgetComponent,
        NoDataWidgetComponent,
        DataLoaderWidgetComponent,
        FlashCommentaryComponent,
        ContentComponent
    ]

})
export class SharedModule { }