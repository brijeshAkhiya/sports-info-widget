import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TennisRoutingModule } from './tennis-routing.module';
/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TennisRoutingModule,
    SharedModule
  ]
})
export class TennisModule { }
