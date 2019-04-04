import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainHeaderComponent } from '../../shared/main-header/main-header.component';
import { MainFooterComponent } from '../../shared/main-footer/main-footer.component';
import { SlugifyPipe } from '../../pipes/slugpipe';

@NgModule({
  declarations: [HomeComponent,MainHeaderComponent,MainFooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers:[SlugifyPipe]
})

export class HomeModule { }
