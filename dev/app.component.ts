import {Component} from "@angular/core";
import {SpeakersListComponent} from "./components/speakers/speakers-list.component";
import {SessionsListComponent} from "./components/sessions/sessions-list.component";
import {ApiService} from "./services/api.service";
import {LocationsComponent} from "./components/locations/locations.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {PagesListComponent} from "./components/pages/pages-list.component";
import {SessionDetailComponent} from "./components/sessions/session-detail.component";
import {SpeakerDetailsComponent} from "./components/speakers/speaker-detail.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SpeakerService} from "./services/speaker.service";
import {SpeakersComponent} from "./components/speakers/speakers.component";
import {EventService} from "./services/event.service";
import {SpeakersEventsService} from "./services/speakers_events.service";
import {PagesComponent} from "./components/pages/pages.component";
import {PagesDetailComponent} from "./components/pages/page-detail.component";
import {BofsListComponent} from "./components/bofs/bofs-list.component";
import {BofDetailComponent} from "./components/bofs/bofs-detail.component";
import {SchedulerListComponent} from "./components/scheduler/scheduler-list.component";
import {SchedulerDetailComponent} from "./components/scheduler/scheduler-detail.component";
import {SocialeventsListComponent} from "./components/social_events/socialevents-list.component";
import {SocialeventDetailComponent} from "./components/social_events/socialevents-detail.component";
import {SocialmediaComponent} from "./components/social_media/socialmedia.component";
import {WindowService} from "./services/window.service";



@Component({
    selector: 'body',
    templateUrl: 'app/views/layout/app.html',
    directives: [ROUTER_DIRECTIVES],
    precompile: [
        SpeakersComponent,
        SpeakersListComponent,
        SpeakerDetailsComponent,
        SessionDetailComponent,
        SessionsListComponent,
        FloorsComponent,
        LocationsComponent,
        PagesComponent,
        PagesListComponent,
        PagesDetailComponent,
        BofsListComponent,
        BofDetailComponent,
        SocialeventsListComponent,
        SocialeventDetailComponent,
        SchedulerListComponent,
        SchedulerDetailComponent,
        SocialmediaComponent,
    ],
    providers: [SpeakerService, SpeakersEventsService, WindowService, EventService]
})

export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }
}
