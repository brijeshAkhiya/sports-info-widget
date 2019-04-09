import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SlugifyPipe } from '../../pipes/slugpipe';
import { TruncatePipe } from '../../pipes/truncatepipe';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { SportsService } from '../../providers/sports-service';


@NgModule({
  declarations: [HomeComponent,TruncatePipe],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgScrollbarModule,
    NgbModule,
    MomentModule
  ],
  providers: [SlugifyPipe,TruncatePipe,SportsService]
})

export class HomeModule { }
