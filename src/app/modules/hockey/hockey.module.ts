import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HockeyRoutingModule } from './hockey-routing.module';

/** External Modules */
import { TranslateModule } from '@ngx-translate/core';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';
import { HockeyComponent } from './hockey.component';
import { TournamentComponent } from './tournament/tournament.component';
import { MatchComponent } from './tournament/match/match.component';
import { StandingsComponent } from './tournament/standings/standings.component';

@NgModule({
  declarations: [HockeyComponent, TournamentComponent, MatchComponent, StandingsComponent],
  imports: [
    CommonModule,
    HockeyRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class HockeyModule { }
