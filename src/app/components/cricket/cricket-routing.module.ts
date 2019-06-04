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
import { TournamentStandingsComponent } from './tournament/tournament-standings/tournament-standings.component';
import { CricketFixturesViewComponent } from './cricket-fixtures-view/cricket-fixtures-view.component';
import { CustomTeamViewComponent } from './teams/custom-team-view/custom-team-view.component';

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
                path:'recent-fixtures/:type/view',
                component:CricketFixturesViewComponent
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
                    },
                    {
                        path:'standings',
                        component:TournamentStandingsComponent
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

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class CricketRoutingModule { }
