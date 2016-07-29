import {Component} from "@angular/core";
import {SpeakersListComponent} from "./components/speakers/speakers-list.component";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
import {ApiService} from "./services/api.service";
import {LocationsComponent} from "./components/locations/locations.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {PagesListComponent} from "./components/pages/pages-list.component";
import {SessionDetailComponent} from "./components/sessions/session-detail.component";
import {SpeakerDetailsComponent} from "./components/speakers/speaker-detail.component";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {SpeakerService} from "./services/speaker.service";
import {SessionsComponent} from "./components/sessions/sessions.component";
import {SpeakersComponent} from "./components/speakers/speakers.component";
import {EventService} from "./services/event.service";
import {SpeakersEventsService} from "./services/speakers_events.service";
import {PagesComponent} from "./components/pages/pages.component";
import {PagesDetailComponent} from "./components/pages/page-detail.component";
import {BofsComponent} from "./components/bofs/bofs.component";
import {BofsListComponent} from "./components/bofs/bofs-list.component";
import {BofDetailComponent} from "./components/bofs/bofs-detail.component";



@Component({
    selector: 'body',
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
        PagesDetailComponent,
        BofsComponent,
        BofsListComponent,
        BofDetailComponent,
    ],
    providers: [SpeakerService, SpeakersEventsService, EventService]
})

export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }
}
