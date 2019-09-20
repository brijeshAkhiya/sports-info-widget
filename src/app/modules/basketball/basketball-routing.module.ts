import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { RouterComponent } from '@app/shared/widget/router/router.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';

import { FixturesComponent } from './fixtures/fixtures.component';
import { StatsComponent } from './stats/stats.component';
import { StandingsComponent } from './standings/standings.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  {
    path: '',
    component: RouterComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { 'sport': 'Basketball' }
      },
      {
        path: 'teams',
        component: TeamsComponent,
        data: { 'sport': 'Basketball' }
      },
      {
        path: 'team/:teamid/:slug',
        component: TeamComponent,
        data: { 'sport': 'Basketball' }
      },
      {
        path: 'player/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'Basketball' }
      },
      {
        path: 'fixtures',
        component: FixturesComponent
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: 'standings',
        component: StandingsComponent
      },
      {
        path: 'match/:id/:slug',
        component: MatchComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketballRoutingModule { }
