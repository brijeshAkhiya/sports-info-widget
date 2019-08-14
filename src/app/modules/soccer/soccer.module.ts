import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** Internal Modules */
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from "@app/shared/shared.module";

import { SoccerRoutingModule } from './soccer-routing.module';
import { SoccerComponent } from './soccer.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';


@NgModule({
  declarations: [SoccerComponent, HomeComponent, FixturesComponent, TournamentListComponent, TournamentComponent, TournamentHomeComponent, TournamentFixturesComponent],
  imports: [
    CommonModule,
    NgbModule,
    SoccerRoutingModule,
    LazyLoadImageModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SoccerModule { }
