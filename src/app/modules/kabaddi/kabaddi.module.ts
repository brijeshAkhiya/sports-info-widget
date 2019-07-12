import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Internal Modules */
import { SharedModule } from "@app/shared/shared.module";

import { KabaddiRoutingModule } from './kabaddi-routing.module';
import { KabaddiComponent } from './kabaddi.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [KabaddiComponent, HomeComponent, FixturesComponent, StatsComponent, TableComponent],
  imports: [
    SharedModule,
    KabaddiRoutingModule,

    CommonModule,
  ]
})
export class KabaddiModule { }
