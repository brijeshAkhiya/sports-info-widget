import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CricketRoutingModule } from './cricket-routing.module';

/** Extrernal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { SharedModule } from "@app/shared/shared.module";

/** Componenets */
import { CricketComponent } from './cricket.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { CricketSidebarComponent } from './cricket-sidebar/cricket-sidebar.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TournamentStadingsComponent } from './tournament/tournament-stadings/tournament-stadings.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { CricketFixturesViewComponent } from './cricket-fixtures-view/cricket-fixtures-view.component';

import { MatchHomeComponent } from './match/match-home/match-home.component';
import { LiveMatchTrackerComponent } from './match/live-match-tracker/live-match-tracker.component';
import { MatchCommentryComponent } from './match/match-commentry/match-commentry.component';
import { MatchFactsFiguresComponent } from './match/match-facts-figures/match-facts-figures.component';
import { MatchScorecardComponent } from './match/match-scorecard/match-scorecard.component';
import { RecommendedComponent } from './match/recommended/recommended.component';
import { UpcomingComponent } from './match/upcoming/upcoming.component';
import { SportsService } from '@app/shared/providers/sports-service';
import { SocketService } from '@app/shared/providers/socket.service';
import { SlugifyPipe } from '@app/shared/pipes/slugpipe';
import { CricketService } from '@app/shared/providers/cricket-service';
import { CommentryComponent } from './match/match-commentry/commentry/commentry.component';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CricketComponent, 
    HomeComponent,
    FixturesComponent,
    TournamentComponent,
    TournamentHomeComponent,
    CricketSidebarComponent,
    TournamentFixturesComponent,
    TournamentStadingsComponent,
    TournamentStatsComponent,
    CricketFixturesViewComponent,
    MatchHomeComponent,
    LiveMatchTrackerComponent,
    MatchCommentryComponent,
    MatchFactsFiguresComponent,
    MatchScorecardComponent,
    RecommendedComponent,
    UpcomingComponent,
    CommentryComponent,
    LiveMatchTrackerComponent,
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    MomentModule,
    NgbModule,
    AgmCoreModule,
    CricketRoutingModule,
    SharedModule,
    TranslateModule
  ],
  providers: [SportsService, SocketService, SlugifyPipe, CricketService],
  exports:[
    CricketSidebarComponent,
  ]
})
export class CricketModule { }
