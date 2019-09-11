import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/shared/pages/home/home.component';
import { RouterComponent } from '@app/shared/widget/router/router.component';

const routes: Routes = [
  {
    path: '',
    component: RouterComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { 'sport': 'Basketball' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketballRoutingModule { }
