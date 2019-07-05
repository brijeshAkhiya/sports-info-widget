import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CricketComponent } from './cricket.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentStadingsComponent } from './tournament/tournament-stadings/tournament-stadings.component';
import { CricketFixturesViewComponent } from './cricket-fixtures-view/cricket-fixtures-view.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { TeamsComponent } from '@app/pages/teams/teams.component';
import { TeamComponent } from '@app/pages/teams/team/team.component';
import { PlayerComponent } from '@app/pages/player/player.component';

const routes: Routes = [
  {
      path: '',
      component: CricketComponent, 
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
            path:'recent/:type',
            component: CricketFixturesViewComponent
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
                  component: TournamentFixturesComponent
              },
              {
                  path: 'teams',
                  component: TeamsComponent,
                  data: { 'sport':'cricket'}
              },
              {
                  path: 'stats',
                  component: TournamentStatsComponent
              },
              {
                  path:'standings',
                  component: TournamentStadingsComponent
              }
          ]
        },
        {
            path: 'match/:id/:slug',
            component: MatchHomeComponent
        },
        {
            path: 'team/:tournamentid/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport':'cricket'}
        },
        {
            path: 'team/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport':'cricket'}
        },
        {
            path: 'player/:id/:slug',
            component: PlayerComponent
        }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketRoutingModule { }