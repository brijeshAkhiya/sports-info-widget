import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from "@app/shared/shared.module";

import { SoccerRoutingModule } from './soccer-routing.module';
import { SoccerComponent } from './soccer.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';

@NgModule({
  declarations: [SoccerComponent, HomeComponent, FixturesComponent],
  imports: [
    CommonModule,
    NgbModule,
    SoccerRoutingModule,
    LazyLoadImageModule,
    SharedModule
  ]
})
export class SoccerModule { }
