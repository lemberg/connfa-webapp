import {Component} from 'angular2/core';
import {SpeakersListComponent} from "./speakers/speakers-list.component";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {SessionsListComponent} from "./sessions/sessions-list.component";

@Component({
    selector: 'app',
    template: `
        <header>
            <nav>
                <a [routerLink]="['Speakers', 'List']">Speakers</a>
                <a [routerLink]="['Sessions', 'List']">Sessions</a>
            </nav>
        </header>
        <div class="main">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [SpeakersListComponent, SessionsListComponent, ROUTER_DIRECTIVES],
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
])
export class AppComponent {
}
