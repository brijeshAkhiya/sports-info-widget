import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        loadChildren: './components/home/home.module#HomeModule',

    },
    {
        path: 'cricket',
        loadChildren: './components/cricket/cricket.module#CricketModule',

    }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }