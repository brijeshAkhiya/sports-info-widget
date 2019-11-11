import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { RouterComponent } from '@app/shared/widget/router/router.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';
import { TournamentsComponent } from '@app/shared/widget/tournaments/tournaments.component';
import { SliderFixtureComponent } from '@app/shared/pages/slider-fixture/slider-fixture.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentStandingsComponent } from './tournament/tournament-standings/tournament-standings.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  {
    path: '',
    component: RouterComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { 'sport': 'Tennis' }
      },
      {
        path: 'fixtures',
        component: SliderFixtureComponent,
        data: { 'sport': 'Tennis' }
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
        data: { 'sport': 'Tennis' }
      },
      {
        path: 'standings',
        component: TournamentStandingsComponent,
        data: { 'sport': 'Tennis' }
      },
      {
        path: 'tournament/:id/:slug',
        component: TournamentComponent,
        children: [
          {
            path: '',
            component: TournamentHomeComponent
          },
          {
            path: 'fixtures',
            component: FixturesComponent,
            data: { 'sport': 'Tennis' }
          },
        ]
      },
      {
        path: 'match/:id/:slug',
        component: MatchComponent
      },
      {
        path: 'teams',
        component: TeamsComponent,
        data: { 'sport': 'Tennis' }
      },
      {
        path: 'team/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'Tennis', 'type': 'team' }
      },
      {
        path: 'player/:id/:slug',
        component: PlayerComponent,
        data: { 'sport': 'Tennis' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TennisRoutingModule { }
