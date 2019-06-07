import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { GeneralBlogListComponent } from './general-blog-list/general-blog-list.component';

const childRoutes: Routes = [
  {
    path: '',
    component:BlogListComponent
  },
  {
    path:'list/:category/:eType',
    component:GeneralBlogListComponent
  },
  {
    path:':type/:id/:slug',
    component:BlogViewComponent
  },
  {
    path:'blog-preview/:type/:id/:slug',
    component:BlogViewComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {

}
