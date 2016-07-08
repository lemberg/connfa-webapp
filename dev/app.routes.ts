import {RouterConfig, provideRouter} from "@angular/router";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
// import {SessionDetailComponent} from "./components/sessions/session-detail.component";
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
