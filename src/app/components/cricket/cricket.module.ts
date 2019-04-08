import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { MainHeaderComponent } from '../../shared/main-header/main-header.component';
import { MainFooterComponent } from '../../shared/main-footer/main-footer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CricketComponent],
  imports: [
    CommonModule,
    SharedModule,
    CricketRoutingModule
  ]
})
export class CricketModule { }
