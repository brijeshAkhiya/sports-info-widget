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
import { TournamentTeamsComponent } from './tournament/tournament-teams/tournament-teams.component';
import { CricketFixturesViewComponent } from './cricket-fixtures-view/cricket-fixtures-view.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { TeamsHomeComponent } from './teams/teams-home/teams-home.component';
import { CustomTeamViewComponent } from './teams/custom-team-view/custom-team-view.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';

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
                  component: TournamentTeamsComponent,
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
            component: TeamsHomeComponent
        },
        {
            path: 'team/:teamid/:slug',
            component: CustomTeamViewComponent
        },
        {
            path: 'player/:id/:slug',
            component: PlayerHomeComponent
        }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketRoutingModule { }