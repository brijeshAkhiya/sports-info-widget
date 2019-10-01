import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SoccerRoutingModule } from './soccer-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { TournamentMatchComponent } from './tournament/tournament-match/tournament-match.component';

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentHomeComponent,
    TournamentStatsComponent,
    TournamentTableComponent,
    TournamentMatchComponent,
  ],

  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    SoccerRoutingModule,
    LazyLoadImageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class SoccerModule { }
