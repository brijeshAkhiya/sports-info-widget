import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoccerComponent } from './soccer.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TeamsComponent } from '@app/shared/teams/teams.component';
import { TeamComponent } from '@app/shared/teams/team/team.component';


const routes: Routes = [{
    path: '',
    component: SoccerComponent,
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
                    component: TournamentFixturesComponent
                },
                {
                    path: 'clubs',
                    component: TeamsComponent,
                    data: { 'sport': 'soccer' }
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
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoccerRoutingModule { }
