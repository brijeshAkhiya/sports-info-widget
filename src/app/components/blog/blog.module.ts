import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  declarations: [BlogListComponent],
  imports: [
    CommonModule,
    NgbModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
