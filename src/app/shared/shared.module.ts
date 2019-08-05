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
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';

/** All Pipes */
import { TruncatePipe } from './pipes/truncatepipe';
import { ResizeImagePipe } from './pipes/resize-image.pipe';
import { SplitPipe } from './pipes/stringsplitpipe';
import { StripHtmlPipe } from './pipes/striphtmlpipe';
import { LogosUrlPipe } from './pipes/logosurlpipe';
import { PlayerImagePipe } from './pipes/playerimageurl.pipe';
import { FlashteamPipe } from "./pipes/flashteamsname.pipe";
import { SlugifyPipe } from "./pipes/slugpipe";
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { StringsplitID } from './pipes/stringsplitID.pipe';
import { CricketScorePipe } from './pipes/cricket-score.pipe';
import { DateParsePipe } from './pipes/dateparse.pipe';
import { StringtoNumberPipe } from './pipes/string-to-number.pipe';

/** All Providers*/
import { SportsService } from './providers/sports-service';
import { CommonService } from './providers/common-service';
import { CricketService } from './providers/cricket-service';
import { SocketService } from './providers/socket.service';

/** All Componenets */
import { CustomAdsWidgetComponent } from './widget/custom-ads-widget/custom-ads-widget.component';
import { NoDataWidgetComponent } from './widget/no-data-widget/no-data-widget.component';

import { FlashCommentaryComponent } from './flash-commentary/flash-commentary.component';
import { ContentComponent } from './widget/content/content.component';
import { SportsHomeComponent } from './sports-home/sports-home.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MenuComponent } from './widget/menu/menu.component';
import { PlayerTableComponent } from './widget/player-table/player-table.component';
import { BlogCardComponent } from './widget/blog-card/blog-card.component';
import { ScheduleComponent } from './widget/schedule/schedule.component';
import { SearchComponent } from './widget/search/search.component';
import { FavouritesWidgetComponent } from './favourites-widget/favourites-widget.component';
import { FilterPipe } from './pipes/filter.pipe';
import { StringUnder } from './pipes/underlinepipe';
import { TeamCardComponent } from './widget/team-card/team-card.component';
import { LoaderComponent } from './widget/loader/loader.component';
import { SidebarLinksComponent } from './widget/sidebar-links/sidebar-links.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { PlayerComponent } from './player/player.component';
import { LoginModalComponent } from './widget/login-modal/login-modal.component';
import { MatchAboutComponent } from './widget/match/about/about.component';
import { PointsTableComponent } from './widget/points-table/points-table.component';
import { GoalCommentryComponent } from './widget/goal-commentry/goal-commentry.component';
import { CountdownComponent } from './widget/countdown/countdown.component';
import { MatchInfoCardComponent } from './widget/match-info-card/match-info-card.component';
import { VenueMapCardComponent } from './widget/venue-map-card/venue-map-card.component';
import { FixturesSidebarWidgetComponent } from './widget/fixtures-sidebar-widget/fixtures-sidebar-widget.component';
import { UppersliderComponent } from './widget/upperslider/upperslider.component';
import { TopScorerWidgetComponent } from './widget/top-scorer-widget/top-scorer-widget.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxTinySliderModule,
        MomentModule,
        NgbModule,
        ClickOutsideModule,
        SocketIoModule,
        AgmCoreModule,
        ReactiveFormsModule,
        FormsModule,
        LazyLoadImageModule,
        CarouselModule
    ],
    declarations: [
        /** All Pipes */
        TruncatePipe,
        ResizeImagePipe,
        SafehtmlPipe,
        LogosUrlPipe,
        PlayerImagePipe, 
        StripHtmlPipe, 
        SplitPipe, 
        StringUnder,
        FlashteamPipe,
        SlugifyPipe,
        FilterPipe,
        StringsplitID,
        CricketScorePipe,
        DateParsePipe,
        StringtoNumberPipe,
        /** All Componenets */
        CustomAdsWidgetComponent, 
        NoDataWidgetComponent, 
        FlashCommentaryComponent, 
        ContentComponent, 
        SportsHomeComponent, 
        BlogListComponent, 
        MenuComponent, 
        PlayerTableComponent, 
        BlogCardComponent, 
        ScheduleComponent, SearchComponent,
        FavouritesWidgetComponent,
        TeamCardComponent,
        LoaderComponent,
        SidebarLinksComponent,
        TeamsComponent,
        TeamComponent,
        PlayerComponent,
        LoginModalComponent,
        MatchAboutComponent,
        PointsTableComponent,
        GoalCommentryComponent,
        CountdownComponent,
        MatchInfoCardComponent,
        VenueMapCardComponent,
        FixturesSidebarWidgetComponent,
        UppersliderComponent,
        TopScorerWidgetComponent,
    ],
    providers: [
        /** All Pipes */
        TruncatePipe, 
        ResizeImagePipe,
        SplitPipe,
        LogosUrlPipe,
        SafehtmlPipe,
        FlashteamPipe,
        SlugifyPipe,  
        FilterPipe,      
        SlugifyPipe, 
        DateParsePipe,       
        StringUnder,
        StringsplitID,
        CricketScorePipe,
        StringtoNumberPipe,
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
        SafehtmlPipe,
        PlayerImagePipe,
        FlashteamPipe,
        DateParsePipe,
        StripHtmlPipe,
        SplitPipe,
        TruncatePipe,
        LogosUrlPipe,
        ResizeImagePipe,
        SlugifyPipe,
        FilterPipe,
        StringUnder,
        StringsplitID,
        CricketScorePipe,
        StringtoNumberPipe,
        /** All Componenets */
        CustomAdsWidgetComponent,
        NoDataWidgetComponent,
        FlashCommentaryComponent,
        ContentComponent,
        SportsHomeComponent,
        BlogListComponent,
        MenuComponent,
        PlayerTableComponent,
        BlogCardComponent,
        ScheduleComponent,
        SearchComponent,
        FavouritesWidgetComponent,
        TeamCardComponent,
        LoaderComponent,
        SidebarLinksComponent,
        LoginModalComponent,
        MatchAboutComponent,
        PointsTableComponent,
        GoalCommentryComponent,
        CountdownComponent,
        MatchInfoCardComponent,
        VenueMapCardComponent,
        FixturesSidebarWidgetComponent,
        TopScorerWidgetComponent,
        UppersliderComponent
    ],
    entryComponents:[LoginModalComponent]

})
export class SharedModule { }