import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';

import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';
import { MatchComponent } from './match/match.component';
import { KabaddiComponent } from './kabaddi.component';

const routes: Routes = [{
  path: '',
  component: KabaddiComponent,
  data: { 'sport': 'Kabaddi' },
  children: [
    {
      path: '',
      component: HomeComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'fixtures',
      component: FixturesComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'results',
      component: FixturesComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'stats',
      component: StatsComponent
    },
    {
      path: 'table',
      component: TableComponent
    },
    {
      path: 'teams',
      component: TeamsComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'team/:teamid/:slug',
      component: TeamComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'player/:id/:slug',
      component: PlayerComponent,
      data: { 'sport': 'Kabaddi' }
    },
    {
      path: 'player/:teamid/:id/:slug',
      component: PlayerComponent,
      data: { 'sport': 'Kabaddi', team: true }
    },
    {
      path: 'match/:id/:slug',
      component: MatchComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KabaddiRoutingModule { }
