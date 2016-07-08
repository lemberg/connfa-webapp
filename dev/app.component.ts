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
import {SessionsComponent} from "./components/sessions/sessions.component";
import {SpeakersComponent} from "./components/speakers/speakers.component";
import {EventService} from "./services/event.service";
import {SpeakersEventsService} from "./services/speakers_events.service";
import {PagesComponent} from "./components/pages/pages.component";
import {PagesDetailComponent} from "./components/pages/page-detail.component";
import {SessionService} from "./services/session.service";
import {BofService} from "./services/bof.service";
// import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";


@Component({
    selector: 'app',
    templateUrl: 'app/views/layout/app.html',
    directives: [ROUTER_DIRECTIVES],
    precompile: [
        SpeakersComponent,
        SpeakersListComponent,
        SpeakerDetailsComponent,
        SessionsComponent,
        SessionDetailComponent,
        SessionsListComponent,
        FloorsComponent,
        LocationsComponent,
        PagesComponent,
        PagesListComponent,
        PagesDetailComponent
    ],
    providers: [SpeakerService, SpeakersEventsService, SessionService, BofService, EventService]
})

export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }
}
