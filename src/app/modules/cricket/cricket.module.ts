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
import { MatchScheduleComponent } from './components/match-schedule/match-schedule.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TournamentStadingsComponent } from './tournament/tournament-stadings/tournament-stadings.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentTeamsComponent } from './tournament/tournament-teams/tournament-teams.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { LiveMatchTrackerComponent } from './match/live-match-tracker/live-match-tracker.component';
import { MatchAboutComponent } from './match/match-about/match-about.component';
import { MatchCommentryComponent } from './match/match-commentry/match-commentry.component';
import { MatchFactsFiguresComponent } from './match/match-facts-figures/match-facts-figures.component';
import { MatchScorecardComponent } from './match/match-scorecard/match-scorecard.component';
import { RecommendedComponent } from './match/recommended/recommended.component';
import { UpcomingComponent } from './match/upcoming/upcoming.component';
import { SportsService } from '@app/shared/providers/sports-service';
import { SocketService } from '@app/shared/providers/socket.service';
import { SlugifyPipe } from '@app/shared/pipes/slugpipe';
import { StringUnder } from '@app/shared/pipes/underlinepipe';
import { CricketService } from '@app/shared/providers/cricket-service';
import { MatchCounterComponent } from './match/match-commentry/match-counter/match-counter.component';
import { CommentryComponent } from './match/match-commentry/commentry/commentry.component';
import { CustomTeamViewComponent } from '@app/components/cricket/teams/custom-team-view/custom-team-view.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    CricketComponent, 
    HomeComponent,
    FixturesComponent,
    TournamentComponent,
    TournamentHomeComponent,
    CricketSidebarComponent,
    MatchScheduleComponent,
    TournamentFixturesComponent,
    TournamentStadingsComponent,
    TournamentStatsComponent,
    TournamentTeamsComponent, 
    MatchHomeComponent,
    LiveMatchTrackerComponent,
    MatchAboutComponent,
    MatchCommentryComponent,
    MatchFactsFiguresComponent,
    MatchScorecardComponent,
    MatchCounterComponent,
    RecommendedComponent,
    UpcomingComponent,StringUnder,
    CommentryComponent,
    LiveMatchTrackerComponent,
    CustomTeamViewComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    MomentModule,
    NgbModule,
    AgmCoreModule,
    CricketRoutingModule,
    SharedModule,
  ],
  providers: [SportsService, SocketService, SlugifyPipe, StringUnder, CricketService],
  exports:[
    CricketSidebarComponent,
    MatchScheduleComponent, 
    MatchAboutComponent
  ]
})
export class CricketModule { }
