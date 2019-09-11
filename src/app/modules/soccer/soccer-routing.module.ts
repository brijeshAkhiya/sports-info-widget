import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterComponent } from '@app/shared/widget/router/router.component';
import { HomeComponent } from '@app/shared/pages/home/home.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TeamsComponent } from '@app/shared/teams/teams.component';
import { TeamComponent } from '@app/shared/teams/team/team.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { TournamentMatchComponent } from './tournament/tournament-match/tournament-match.component';
import { PlayerComponent } from '@app/shared/player/player.component';


const routes: Routes = [{
    path: '',
    component: RouterComponent,
    children: [
        {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'fixtures',
            component: FixturesComponent,
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'tournaments',
            component: TournamentListComponent
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
                    data: { 'sport': 'Soccer' }
                },
                {
                    path: 'clubs',
                    component: TeamsComponent,
                    data: { 'sport': 'soccer' }
                },
                {
                    path: 'stats',
                    component: TournamentStatsComponent,
                },
                {
                    path: 'table',
                    component: TournamentTableComponent,
                },
            ]
        },
        {
            path: 'team/:tournamentid/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport': 'soccer' }
        },
        {
            path: 'team/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport': 'soccer' }
        },
        {
            path: 'player/:id/:slug',
            component: PlayerComponent,
            data: { 'sport': 'soccer' }
        },
        {
            path: 'match/:id/:slug',
            component: TournamentMatchComponent
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoccerRoutingModule { }
