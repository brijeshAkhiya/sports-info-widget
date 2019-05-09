import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';


const childRoutes: Routes = [
  {
    path: '',
    component:BlogListComponent
  },
  {
    path:':type/:id/:slug',
    component:BlogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {

}
