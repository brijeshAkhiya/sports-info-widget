import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriterProfileComponent } from './components/writer/writer-profile/writer-profile.component';

const routes: Routes = [

    {
        path: '',
        loadChildren: './components/home/home.module#HomeModule',

    },
    {
        path: 'cricket',
        loadChildren: './components/cricket/cricket.module#CricketModule',

    },
    {
        path: 'blog',
        loadChildren: './components/blog/blog.module#BlogModule',

    },
    {
        path: 'writer/:id',
        component:WriterProfileComponent

    }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }