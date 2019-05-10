import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriterProfileComponent } from './components/writer/writer-profile/writer-profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AdvertiseWithUsComponent } from './components/advertise-with-us/advertise-with-us.component';

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
        component:PrivacyPolicyComponent

    },
    {
        path: 'terms-and-conditions',
        component:TermsAndConditionsComponent

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