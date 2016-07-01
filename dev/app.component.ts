// import {MenuComponent} from "./components/menu.component";
import {SpeakersListComponent} from "./components/speakers/speakers-list.component";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
import {ApiService} from "./services/api.service";
import {LocationsComponent} from "./components/locations/locations.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {PagesListComponent} from "./components/pages/pages-list.component";
import {SessionDetailComponent} from "./components/sessions/session-detail.component";
import {SpeakerDetailsComponent} from "./components/speakers/speaker-detail.component";
import {Component} from "@angular/core";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {SpeakerService} from "./services/speaker.service";
// import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";


@Component({
    selector: 'app',
    templateUrl: 'app/views/layout/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SpeakerService],
    precompile: [SpeakersListComponent, SpeakerDetailsComponent]
})
// @RouteConfig([
//     {
//         path: '/speakers/...',
//         name: 'Speakers',
//         component: SpeakersListComponent,
//         // children: [
//         //     { path: ':id',  component: SpeakerDetailsComponent },
//         //     { path: '',     component: SpeakersListComponent }
//         // ]
//     },
//     {
//         path: '/sessions/...',
//         name: 'Sessions',
//         component: SessionsListComponent,
//         // useAsDefault: true,
//     },
//     {
//         path: '/info/...',
//         name: 'Pages',
//         component: PagesListComponent,
//     },
//     {
//         path: '/floors',
//         name: 'Floors',
//         component: FloorsComponent,
//     },
//     {
//         path: '/locations',
//         name: 'Locations',
//         component: LocationsComponent,
//     },
// ])
export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }
}
