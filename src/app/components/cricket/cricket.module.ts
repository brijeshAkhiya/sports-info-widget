import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MomentModule } from 'ngx-moment';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SportsService } from '../../providers/sports-service';

import { CricketMenuComponent } from './cricket-menu/cricket-menu.component';
import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketSeriesComponent } from './cricket-series/cricket-series.component';
import { CricketTeamsComponent } from './cricket-teams/cricket-teams.component';

@NgModule({
  declarations: [CricketComponent, CricketMenuComponent, CricketFixturesComponent, CricketSeriesComponent, CricketTeamsComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    MomentModule,
    CricketRoutingModule,
    ScrollingModule,
  ],
  providers: [SportsService]
})
export class CricketModule { }
