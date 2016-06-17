import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {MenuComponent} from "./components/menu.component";
import {SpeakersListComponent} from "./components/speakers/speakers-list.component";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
import {ApiService} from "./services/api.service";
import {LocationsComponent} from "./components/locations/locations.component";
import {FloorsComponent} from "./components/floors/floors.component";

@Component({
    selector: 'app',
    template: `
        <div class="main">
            <router-outlet></router-outlet>
        </div>
        <main-menu></main-menu>
    `,
    directives: [MenuComponent, ROUTER_DIRECTIVES],
})
@RouteConfig([
    {
        path: '/speakers/...',
        name: 'Speakers',
        component: SpeakersListComponent,
    },
    {
        path: '/sessions/...',
        name: 'Sessions',
        component: SessionsListComponent,
    },
    {
        path: '/floors',
        name: 'Floors',
        component: FloorsComponent,
    },
    {
        path: '/locations',
        name: 'Locations',
        component: LocationsComponent,
    },
])
export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }
}
