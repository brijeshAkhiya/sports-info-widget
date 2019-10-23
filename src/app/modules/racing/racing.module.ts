import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacingRoutingModule } from './racing-routing.module';

/** External Modules */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';
import { StandingsComponent } from './standings/standings.component';
import { ProbabilityComponent } from './probability/probability.component';
import { RacingComponent } from './racing.component';
import { GameComponent } from './game.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [StandingsComponent, ProbabilityComponent, RacingComponent, GameComponent, MatchComponent],
  imports: [
    CommonModule,
    RacingRoutingModule,
    SharedModule,
    NgbModule,
    TranslateModule
  ]
})
export class RacingModule { }
