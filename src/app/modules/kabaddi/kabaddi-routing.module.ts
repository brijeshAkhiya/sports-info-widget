import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KabaddiComponent } from './kabaddi.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';
import { TeamsComponent } from '@app/shared/teams/teams.component';
import { TeamComponent } from '@app/shared/teams/team/team.component';
import { PlayerComponent } from '@app/shared/player/player.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [{
  path: '',
  component: KabaddiComponent,
  children: [
    {
      path: '',
      component: HomeComponent
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
        path: 'table',
        component: TableComponent
    },
    {
        path: 'teams',
        component: TeamsComponent,
        data: { 'sport': 'kabaddi' }
    },
    {
        path: 'team/:teamid/:slug',
        component: TeamComponent,
        data: { 'sport': 'kabaddi' }
    },
    {
        path: 'player/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'kabaddi' }
    },
    {
        path: 'player/:teamid/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'kabaddi', team: true }
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
