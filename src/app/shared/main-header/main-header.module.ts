import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** All  Internal Modules */
import { SharedModule } from "../shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule
  ],

})
export class MainHeaderModule { }
