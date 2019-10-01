import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterComponent } from '@app/shared/widget/router/router.component';
import { HomeComponent } from '@app/shared/pages/home/home.component';
import { FixturesComponent } from '@app/shared/pages/fixtures/fixtures.component';
import { TeamsComponent } from '@app/shared/pages/teams/teams.component';
import { TeamComponent } from '@app/shared/pages/teams/team/team.component';
import { PlayerComponent } from '@app/shared/pages/player/player.component';
import { SliderFixtureComponent } from '@app/shared/pages/slider-fixture/slider-fixture.component';
import { TournamentsComponent } from '@app/shared/widget/tournaments/tournaments.component';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentStatsComponent } from './tournament/tournament-stats/tournament-stats.component';
import { TournamentTableComponent } from './tournament/tournament-table/tournament-table.component';
import { TournamentMatchComponent } from './tournament/tournament-match/tournament-match.component';


const routes: Routes = [{
    path: '',
    component: RouterComponent,
    data: { 'sport': 'Soccer' },
    children: [
        {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'fixtures',
            component: SliderFixtureComponent,
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'tournaments',
            component: TournamentsComponent,
            data: { 'sport': 'Soccer' }
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
                    data: { 'sport': 'Soccer' }
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
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'team/:teamid/:slug',
            component: TeamComponent,
            data: { 'sport': 'Soccer' }
        },
        {
            path: 'player/:id/:slug',
            component: PlayerComponent,
            data: { 'sport': 'Soccer' }
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
