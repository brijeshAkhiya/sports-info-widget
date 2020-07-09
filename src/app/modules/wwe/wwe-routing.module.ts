import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterComponent } from '@app/shared/widget/router/router.component';
import { HomeComponent } from '@app/shared/pages/home/home.component';

const routes: Routes = [{
    path: '',
    component: RouterComponent,
    data: { 'sport': 'WWE' },
    children: [
        {
            path: '',
            component: HomeComponent,
            data: { 'sport': 'WWE' }
        }        
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WweRoutingModule { }
