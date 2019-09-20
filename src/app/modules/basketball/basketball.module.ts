import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Extrernal Modules */
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { BasketballRoutingModule } from './basketball-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StatsComponent } from './stats/stats.component';
import { StandingsComponent } from './standings/standings.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [FixturesComponent, StatsComponent, StandingsComponent, MatchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    BasketballRoutingModule,
    SharedModule
  ]
})
export class BasketballModule { }
