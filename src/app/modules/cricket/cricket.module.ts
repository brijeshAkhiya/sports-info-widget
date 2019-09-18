import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CricketRoutingModule } from './cricket-routing.module';

/** Extrernal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';

/** Componenets */
import { CricketFixturesComponent } from './fixtures/fixtures.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentStadingsComponent } from './tournament/tournament-stadings/tournament-stadings.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';

import { MatchHomeComponent } from './match/match-home/match-home.component';
import { MatchCommentryComponent } from './match/match-commentry/match-commentry.component';
import { MatchFactsFiguresComponent } from './match/match-facts-figures/match-facts-figures.component';
import { MatchScorecardComponent } from './match/match-scorecard/match-scorecard.component';
import { RecommendedComponent } from './match/recommended/recommended.component';
import { UpcomingComponent } from './match/upcoming/upcoming.component';
import { SportsService } from '@app/shared/providers/sports-service';
import { SlugifyPipe } from '@app/shared/pipes/slugpipe';
import { CommentryComponent } from './match/match-commentry/commentry/commentry.component';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CricketFixturesComponent,
    TournamentComponent,
    TournamentHomeComponent,
    TournamentStadingsComponent,
    TournamentStatsComponent,
    MatchHomeComponent,
    MatchCommentryComponent,
    MatchFactsFiguresComponent,
    MatchScorecardComponent,
    RecommendedComponent,
    UpcomingComponent,
    CommentryComponent,
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
  providers: [SportsService, SlugifyPipe],
  exports: [
  ]
})
export class CricketModule { }
