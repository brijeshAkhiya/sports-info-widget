import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { CricketFixturesComponent } from './fixtures/fixtures.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentStadingsComponent } from './tournament/tournament-stadings/tournament-stadings.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { CricketComponent } from './cricket.component';

const routes: Routes = [
    {
        path: '',
        component: CricketComponent,
        data: { 'sport': 'Cricket', 'type': 'home' },
        children: [
            {
                path: '',
                component: HomeComponent,
                data: { 'sport': 'Cricket' }
            },
            {
                path: 'fixtures',
                component: CricketFixturesComponent
            },
            {
                path: 'recent/:type',
                component: FixturesComponent,
                data: { 'sport': 'Cricket' }
            },
            {
                path: 'tournament/:id/:slug',
                component: TournamentComponent,
                children: [
                    {
                        path: '',
                        component: HomeComponent,
                        data: { 'sport': 'Cricket' }
                    },
                    {
                        path: 'fixtures',
                        component: FixturesComponent,
                        data: { 'sport': 'Cricket' }
                    },
                    {
                        path: 'teams',
                        component: TeamsComponent,
                        data: { 'sport': 'Cricket' }
                    },
                    {
                        path: 'stats',
                        component: TournamentStatsComponent
                    },
                    {
                        path: 'standings',
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
                data: { 'sport': 'Cricket' }
            },
            {
                path: 'team/:teamid/:slug',
                component: TeamComponent,
                data: { 'sport': 'Cricket' }
            },
            {
                path: 'player/:id/:slug',
                component: PlayerComponent,
                data: { 'sport': 'Cricket' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CricketRoutingModule { }
