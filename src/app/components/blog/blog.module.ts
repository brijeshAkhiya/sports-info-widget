import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogViewComponent } from './blog-view/blog-view.component';

@NgModule({
  declarations: [BlogListComponent, BlogViewComponent],
  imports: [
    CommonModule,
    NgbModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
