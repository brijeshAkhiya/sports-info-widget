import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { WriterComponent } from './writer.component';

const childRoutes: Routes = [
     {
      path: '',
      component: WriterComponent
     }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class WriterRoutingModule { 

}
