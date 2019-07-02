import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CmsContentComponent } from './pages/cms-content/cms-content.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdvertiseWithUsComponent } from './pages/advertise-with-us/advertise-with-us.component';
import { BlogsComponent } from './pages/blogs/blogs.component';

import { WriterProfileComponent } from './components/writer/writer-profile/writer-profile.component';
import { BlogViewComponent } from './pages/blogs/blog-view/blog-view.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule',
    },
    {
        path: 'cricket',
        loadChildren: './modules/cricket/cricket.module#CricketModule',
    },
    {
        path: 'blog',
        component: BlogsComponent
    },
    {
        path: 'blog/:slug',
        component: BlogViewComponent,
    },
    {
        path: 'article',
        component: BlogsComponent
    },
    {
        path: 'article/:slug',
        component: BlogViewComponent
    },
    {
        path: 'video',
        component: BlogsComponent
    },
    {
        path: 'video/:slug',
        component: BlogViewComponent
    },
    {
        path: 'search/:key',
        component: BlogsComponent
    },
    {
        path: 'search',
        redirectTo: ''
    },
    {
        path: 'writer/:id',
        component:WriterProfileComponent
    },
    {
        path: 'coming-soon/:sport',
        component:ComingSoonComponent
    },
    {
        path: 'about',
        component:AboutComponent
    },
    {
        path: 'contact-us',
        component:ContactComponent
    },
    {
        path: 'privacy-policy',
        component:CmsContentComponent
    },
    {
        path: 'terms-and-conditions',
        component:CmsContentComponent
    },
    {
        path: 'advertise-with-us',
        component:AdvertiseWithUsComponent
    },
    {
        path: '**',
        component:PageNotFoundComponent
    },




]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }