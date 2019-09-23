import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Extrernal Modules */
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

/** Internal Modules */
import { BasketballRoutingModule } from './basketball-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { StatsComponent } from './stats/stats.component';
import { StandingsComponent } from './standings/standings.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [StatsComponent, StandingsComponent, MatchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    CarouselModule,
    BasketballRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class BasketballModule { }
