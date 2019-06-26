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
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    MomentModule,
    NgbModule,

    CricketRoutingModule,
    SharedModule,
  ],
  exports:[
    CricketSidebarComponent,
    MatchScheduleComponent, 
  ]
})
export class CricketModule { }
