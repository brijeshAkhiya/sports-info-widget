import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandingsComponent } from './standings/standings.component';
import { ProbabilityComponent } from './probability/probability.component';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { RouterComponent } from '@app/shared/widget/router/router.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { RacingComponent } from './racing.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component: RacingComponent,
    children: [
      {
        path: ':game',
        component: GameComponent,
        data: { 'sport': 'Racing' },
        children: [
          {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'Racing' }
          },
          {
            path: 'teams',
            component: TeamsComponent,
            data: { 'sport': 'Racing' }
          },
          {
            path: 'schedule',
            component: FixturesComponent,
            data: { 'sport': 'Racing' }
          },
          {
            path: 'standings',
            component: StandingsComponent,
            data: { 'sport': 'Racing' }
          },
          {
            path: 'team/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport': 'Racing' }
          },
          {
            path: 'probabilities',
            component: ProbabilityComponent,
            data: { 'sport': 'Racing' }
          },
        ]
      },
      {
        path: 'team/:teamid/:slug',
        component: TeamComponent,
        data: { 'sport': 'Racing' }
      },
      {
        path: 'player/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'Racing' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacingRoutingModule { }
