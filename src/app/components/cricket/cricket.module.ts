import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MomentModule } from 'ngx-moment';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SportsService } from '../../providers/sports-service';
import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketHomeComponent } from './cricket-home/cricket-home.component';
import { CricketMenuComponent } from '../../shared/cricket-menu/cricket-menu.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TournamentTeamsComponent } from './tournament/tournament-teams/tournament-teams.component';
import { TournamentStateComponent } from './tournament/tournament-state/tournament-state.component';
import { TeamsHomeComponent } from './teams/teams-home/teams-home.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { TournamentCricketComponent } from './tournament/tournament-cricket/tournament-cricket.component';
import { CricketTourMenuComponent } from '../../shared/cricket-tour-menu/cricket-tour-menu.component';
import { SlugifyPipe } from '../../pipes/slugpipe';
import { TournamentStandingsComponent } from './tournament/tournament-standings/tournament-standings.component';
import { SplitPipe } from '../../pipes/stringsplitpipe';
import { StringUnder } from '../../pipes/underlinepipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatchCommentryComponent } from './match/match-commentry/match-commentry.component';
import { CommentryComponent } from './match/match-commentry/commentry/commentry.component';
import { MatchCounterComponent } from './match/match-commentry/match-counter/match-counter.component';
import { MatchFactsFiguresComponent } from './match/match-facts-figures/match-facts-figures.component';
import { MatchScorecardComponent } from './match/match-scorecard/match-scorecard.component';
import { UpcomingComponent } from './match/upcoming/upcoming.component';
import { RecommendedComponent } from './match/recommended/recommended.component';
import { MatchAboutComponent } from './match/match-about/match-about.component';

@NgModule({
  declarations: [CricketComponent, CricketFixturesComponent, CricketHomeComponent, CricketMenuComponent, TournamentHomeComponent, TournamentFixturesComponent, TournamentTeamsComponent, TournamentStateComponent, TeamsHomeComponent, MatchHomeComponent, PlayerHomeComponent, TournamentCricketComponent, CricketTourMenuComponent, TournamentStandingsComponent, StringUnder, MatchCommentryComponent, CommentryComponent, MatchCounterComponent, MatchFactsFiguresComponent, MatchScorecardComponent, UpcomingComponent, RecommendedComponent, MatchAboutComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    MomentModule,
    AgmCoreModule,
    CricketRoutingModule,
    ScrollingModule,
    LazyLoadImageModule
  ],
  providers: [SportsService, SlugifyPipe, StringUnder],
  exports: [CommentryComponent, MatchCounterComponent, MatchAboutComponent]
})
export class CricketModule { }
