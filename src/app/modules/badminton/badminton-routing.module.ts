import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { SliderFixtureComponent } from '@app/shared/pages/slider-fixture/slider-fixture.component';
import { TournamentsComponent } from '@app/shared/widget/tournaments/tournaments.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';

import { BadmintonComponent } from './badminton.component';
import { TournamentComponent } from './tournament/tournament.component';
import { StandingsComponent } from './tournament/standings/standings.component';

const routes: Routes = [
  {
    path: '',
    component: BadmintonComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { 'sport': 'Badminton' }
      },
      {
        path: 'fixtures',
        component: SliderFixtureComponent,
        data: { 'sport': 'Badminton' }
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
        data: { 'sport': 'Badminton' }
      },
      {
        path: 'tournament/:id/:slug',
        component: TournamentComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'Badminton' }
          },
          {
            path: 'fixtures',
            component: FixturesComponent,
            data: { 'sport': 'Badminton' }
          },
          // {
          //   path: 'teams',
          //   component: TeamsComponent,
          //   data: { 'sport': 'Hockey' }
          // },
          {
            path: 'table',
            component: StandingsComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadmintonRoutingModule { }
