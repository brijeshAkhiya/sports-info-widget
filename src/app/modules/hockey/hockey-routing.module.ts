import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { SliderFixtureComponent } from '@app/shared/pages/slider-fixture/slider-fixture.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TournamentsComponent } from '@app/shared/widget/tournaments/tournaments.component';

import { HockeyComponent } from './hockey.component';
import { TournamentComponent } from './tournament/tournament.component';
import { MatchComponent } from './tournament/match/match.component';
import { StandingsComponent } from './tournament/standings/standings.component';

const routes: Routes = [
  {
    path: '',
    component: HockeyComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { 'sport': 'Hockey' }
      },
      {
        path: 'fixtures',
        component: SliderFixtureComponent,
        data: { 'sport': 'Hockey' }
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
        data: { 'sport': 'Hockey' }
      },
      {
        path: 'team/:teamid/:slug',
        component: TeamComponent,
        data: { 'sport': 'Hockey' }
      },
      {
        path: 'player/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'Hockey' }
      },
      {
        path: 'tournament/:id/:slug',
        component: TournamentComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'Hockey' }
          },
          {
            path: 'fixtures',
            component: FixturesComponent,
            data: { 'sport': 'Hockey' }
          },
          {
            path: 'teams',
            component: TeamsComponent,
            data: { 'sport': 'Hockey' }
          },
          {
            path: 'table',
            component: StandingsComponent
          }
        ]
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
export class HockeyRoutingModule { }
