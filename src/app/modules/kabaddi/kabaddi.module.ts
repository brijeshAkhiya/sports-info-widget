import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { SharedModule } from "@app/shared/shared.module";

import { KabaddiRoutingModule } from './kabaddi-routing.module';
import { KabaddiComponent } from './kabaddi.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';
import { MatchComponent } from './match/match.component';
import { KabaddiService } from './kabaddi.service';

@NgModule({
  declarations: [KabaddiComponent, HomeComponent, FixturesComponent, StatsComponent, TableComponent, MatchComponent],
  imports: [
    SharedModule,
    KabaddiRoutingModule,
    NgbModule,
    CommonModule,
  ],
  providers:[KabaddiService]
})
export class KabaddiModule { }
