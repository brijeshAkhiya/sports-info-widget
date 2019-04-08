import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SlugifyPipe } from '../../pipes/slugpipe';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgScrollbarModule,
    NgbModule
  
  ],
  providers:[SlugifyPipe]
})

export class HomeModule { }
