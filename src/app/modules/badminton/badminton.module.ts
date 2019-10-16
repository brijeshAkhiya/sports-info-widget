import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadmintonRoutingModule } from './badminton-routing.module';

/** External Modules */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';
import { BadmintonComponent } from './badminton.component';
import { TournamentComponent } from './tournament/tournament.component';
import { StandingsComponent } from './tournament/standings/standings.component';

@NgModule({
  declarations: [BadmintonComponent, TournamentComponent, StandingsComponent],
  imports: [
    CommonModule,
    BadmintonRoutingModule,
    NgbModule,
    TranslateModule,
    SharedModule
  ]
})
export class BadmintonModule { }
