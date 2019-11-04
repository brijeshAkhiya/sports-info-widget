import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { TennisRoutingModule } from './tennis-routing.module';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentStandingsComponent } from './tournament/tournament-standings/tournament-standings.component';

@NgModule({
  declarations: [TournamentComponent, TournamentHomeComponent, TournamentStandingsComponent],
  imports: [
    CommonModule,
    TennisRoutingModule,
    SharedModule,
    TranslateModule,
    NgbModule
  ]
})
export class TennisModule { }
