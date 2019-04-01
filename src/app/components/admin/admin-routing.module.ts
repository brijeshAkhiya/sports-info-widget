import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';

const childRoutes: Routes = [
     {
      path: '',
      component: AdminComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

}
