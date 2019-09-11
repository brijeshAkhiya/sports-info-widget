import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketballRoutingModule } from './basketball-routing.module';

/** Internal Modules */
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketballRoutingModule,
    SharedModule
  ]
})
export class BasketballModule { }
