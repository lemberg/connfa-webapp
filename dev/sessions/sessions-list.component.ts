import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {SessionDetailComponent} from "./session-detail.component";
@Component({
    template: `<p>Hello in sessions</p>`
})
@RouteConfig([
    {
        path: '/',
        name: 'List',
        component: SessionDetailComponent,
    },
])
export class SessionsListComponent {

}
