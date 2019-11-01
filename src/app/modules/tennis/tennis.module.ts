import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TennisRoutingModule } from './tennis-routing.module';
/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';

@NgModule({
  declarations: [TournamentComponent, TournamentHomeComponent],
  imports: [
    CommonModule,
    TennisRoutingModule,
    SharedModule
  ]
})
export class TennisModule { }
