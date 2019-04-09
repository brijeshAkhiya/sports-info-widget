import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CricketComponent],
  imports: [
    CommonModule,
    SharedModule,
    CricketRoutingModule,
    ScrollingModule
  ]
})
export class CricketModule { }
