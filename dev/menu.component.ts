import {Component} from 'angular2/core';
import {SpeakersListComponent} from "./speakers/speakers-list.component";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {SessionsListComponent} from "./sessions/sessions-list.component";

@Component({
    selector: 'main-menu',
    templateUrl: 'views/menu.html',
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
export class MenuComponent {
    constructor(private router:Router) {
    }

    isActive(instruction:any[]):boolean {
        
        return this.router.isRouteActive(this.router.generate(instruction));
    }
}
