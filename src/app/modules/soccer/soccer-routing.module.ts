import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoccerComponent } from './soccer.component';
import { HomeComponent } from './home/home.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';


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
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoccerRoutingModule { }
