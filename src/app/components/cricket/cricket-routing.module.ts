import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CricketComponent } from './cricket.component';
import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketSeriesComponent } from './cricket-series/cricket-series.component';
import { CricketTeamsComponent } from './cricket-teams/cricket-teams.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CricketComponent
    },
    {
        path: 'fixtures',
        component: CricketFixturesComponent
    },
    {
        path: 'series',
        component: CricketSeriesComponent
    },
    {
        path: 'teams',
        component: CricketTeamsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class CricketRoutingModule { }
