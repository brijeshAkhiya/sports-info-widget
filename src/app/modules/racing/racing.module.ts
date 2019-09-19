import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacingRoutingModule } from './racing-routing.module';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RacingRoutingModule,
    SharedModule
  ]
})
export class RacingModule { }
