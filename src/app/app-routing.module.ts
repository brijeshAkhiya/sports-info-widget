import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    {
        path: 'admin',
        loadChildren: './components/admin/admin.module#AdminModule',

    },
    {
        path: 'writer',
        loadChildren: './components/writer/writer.module#WriterModule',

    },
    {
        path: '',
        loadChildren: './components/home/home.module#HomeModule',

    }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }