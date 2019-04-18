import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MomentModule } from 'ngx-moment';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SportsService } from '../../providers/sports-service';


import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketSeriesComponent } from './cricket-series/cricket-series.component';
import { CricketHomeComponent } from './cricket-home/cricket-home.component';

@NgModule({
  declarations: [CricketComponent, CricketFixturesComponent, CricketSeriesComponent, CricketHomeComponent],
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
