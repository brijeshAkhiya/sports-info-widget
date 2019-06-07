import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { SharedModule } from '../../shared/shared.module';
import { MomentModule } from 'ngx-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GeneralBlogListComponent } from './general-blog-list/general-blog-list.component';

@NgModule({
  declarations: [BlogListComponent, BlogViewComponent, GeneralBlogListComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    MomentModule,
    BlogRoutingModule,
    LazyLoadImageModule
  ],
  providers:[],
  exports:[]
})
export class BlogModule { }
