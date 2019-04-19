import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CricketComponent } from './cricket.component';
import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketHomeComponent } from './cricket-home/cricket-home.component';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentFixturesComponent } from './tournament/tournament-fixtures/tournament-fixtures.component';
import { TournamentTeamsComponent } from './tournament/tournament-teams/tournament-teams.component';
import { TournamentStateComponent } from './tournament/tournament-state/tournament-state.component';
import { MatchHomeComponent } from './match/match-home/match-home.component';
import { TeamsHomeComponent } from './teams/teams-home/teams-home.component';
import { PlayerHomeComponent } from './player/player-home/player-home.component';
import { TournamentCricketComponent } from './tournament/tournament-cricket/tournament-cricket.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CricketComponent,
        children: [
            {
                path: '',
                component: CricketHomeComponent
            },
            {
                path: 'fixtures',
                component: CricketFixturesComponent
            },
            {
                path: 'tournament/:id/:slug',
                component: TournamentCricketComponent,
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
                        component: TournamentTeamsComponent
                    },
                    {
                        path: 'stats',
                        component: TournamentStateComponent
                    }
                ]
            },
            {
                path: 'match/:id/:slug',
                component: MatchHomeComponent
            },
            {
                path: 'team/:id/:slug',
                component: TeamsHomeComponent
            },
            {
                path: 'player/:id/:slug',
                component: PlayerHomeComponent
            }

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class CricketRoutingModule { }
