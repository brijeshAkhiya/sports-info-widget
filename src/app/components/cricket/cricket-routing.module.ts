import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CricketComponent } from './cricket.component';
import { CricketFixturesComponent } from './cricket-fixtures/cricket-fixtures.component';
import { CricketSeriesComponent } from './cricket-series/cricket-series.component';
import { CricketHomeComponent } from './cricket-home/cricket-home.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class CricketRoutingModule { }
