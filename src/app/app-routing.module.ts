import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriterProfileComponent } from './components/writer/writer-profile/writer-profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { AboutComponent } from './components/static-pages/about/about.component';
import { ContactComponent } from './components/static-pages/contact/contact.component';
import { AdvertiseWithUsComponent } from './components/static-pages/advertise-with-us/advertise-with-us.component';
import { CmsContentComponent } from './components/static-pages/cms-content/cms-content.component';

const routes: Routes = [

    {
        path: '',
        loadChildren: './components/home/home.module#HomeModule',

    },
    {
        path: 'cricket',
        loadChildren: './components/cricket/cricket.module#CricketModule',

    },
    {
        path: 'blog',
        loadChildren: './components/blog/blog.module#BlogModule',

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