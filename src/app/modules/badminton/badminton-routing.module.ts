import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { SliderFixtureComponent } from '@app/shared/pages/slider-fixture/slider-fixture.component';
import { TournamentsComponent } from '@app/shared/widget/tournaments/tournaments.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';

import { BadmintonComponent } from './badminton.component';
import { TournamentComponent } from './tournament/tournament.component';
import { StandingsComponent } from './tournament/standings/standings.component';
import { MatchComponent } from './tournament/match/match.component';

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
        path: 'team/:teamid/:slug',
        component: TeamComponent,
        data: { 'sport': 'Badminton' }
      },
      {
        path: 'player/:id/:slug',
        component: PlayerComponent,
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
          {
            path: 'teams',
            component: TeamsComponent,
            data: { 'sport': 'Badminton' }
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadmintonRoutingModule { }
