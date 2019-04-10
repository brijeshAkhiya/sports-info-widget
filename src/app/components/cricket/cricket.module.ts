import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CricketComponent } from './cricket.component';
import { CricketRoutingModule } from './cricket-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CricketComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    CricketRoutingModule,
    ScrollingModule,
  
  ]
})
export class CricketModule { }
