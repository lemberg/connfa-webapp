import {RouterConfig, provideRouter} from "@angular/router";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
import {SpeakersListComponent} from "./components/speakers/speakers-list.component";
import {SpeakerDetailsComponent} from "./components/speakers/speaker-detail.component";
import {SpeakersComponent} from "./components/speakers/speakers.component";
import {SessionsComponent} from "./components/sessions/sessions.component";
import {SessionDetailComponent} from "./components/sessions/session-detail.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {LocationsComponent} from "./components/locations/locations.component";
import {PagesComponent} from "./components/pages/pages.component";
import {PagesDetailComponent} from "./components/pages/page-detail.component";
import {PagesListComponent} from "./components/pages/pages-list.component";
import {BofsComponent} from "./components/bofs/bofs.component";
import {BofDetailComponent} from "./components/bofs/bofs-detail.component";
import {BofsListComponent} from "./components/bofs/bofs-list.component";
import {SocialeventsComponent} from "./components/social_events/socialevents.component";
import {SocialeventDetailComponent} from "./components/social_events/socialevents-detail.component";
import {SocialeventsListComponent} from "./components/social_events/socialevents-list.component";
import {SocialmediaComponent} from "./components/social_media/socialmedia.component";
import {SchedulerComponent} from "./components/scheduler/scheduler.component";
import {SchedulerListComponent} from "./components/scheduler/scheduler-list.component";
import {SchedulerDetailComponent} from "./components/scheduler/scheduler-detail.component";


export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/sessions',
        terminal: true
    },
    {
        path: 'sessions',
        component: SessionsComponent,
        children: [
            { path: ':id',  component: SessionDetailComponent },
            { path: '',     component: SessionsListComponent, terminal: true }
        ]
    },
    {
        path: 'bofs',
        component: BofsComponent,
        children: [
            { path: ':id',  component: BofDetailComponent },
            { path: '',     component: BofsListComponent, terminal: true }
        ]
    },
    {
        path: 'socialevents',
        component: SocialeventsComponent,
        children: [
            { path: ':id',  component: SocialeventDetailComponent },
            { path: '',     component: SocialeventsListComponent, terminal: true }
        ]
    },
    {
        path: 'scheduler',
        component: SchedulerComponent,
        children: [
            { path: ':id',  component: SchedulerDetailComponent },
            { path: '',  component: SchedulerListComponent, terminal: true },
        ]
    },
    {
        path: 'speakers',
        component: SpeakersComponent,
        children: [
            { path: ':id',  component: SpeakerDetailsComponent },
            { path: '',     component: SpeakersListComponent, terminal: true }
        ]
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: ':id',  component: PagesDetailComponent },
            { path: '',     component: PagesListComponent, terminal: true }
        ]
    },
    {
        path: 'media',
        component: SocialmediaComponent,
    },
    {
        path: 'floors',
        component: FloorsComponent,
    },
    {
        path: 'locations',
        component: LocationsComponent,
    },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]
