import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from '@app/shared/shared.module';

import { KabaddiRoutingModule } from './kabaddi-routing.module';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';
import { MatchComponent } from './match/match.component';
import { TranslateModule } from '@ngx-translate/core';
import { KabaddiComponent } from './kabaddi.component';

@NgModule({
  declarations: [HomeComponent, StatsComponent, TableComponent, MatchComponent, KabaddiComponent],
  imports: [
    LazyLoadImageModule,
    SharedModule,
    KabaddiRoutingModule,
    NgbModule,
    CommonModule,
    TranslateModule,
    ChartsModule
  ],
  providers: []
})
export class KabaddiModule { }
