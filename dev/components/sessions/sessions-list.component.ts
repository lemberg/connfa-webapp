import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {FilterComponent} from "../events_partials/filter.component";

declare var moment: any;

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/sessions/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class SessionsListComponent implements OnInit{

    sessions = [];
    activeSessions = [];
    hours = [];

    constructor(private _sessionService: SessionService) {}

    ngOnInit():any {
        console.log('INIT LIST');
        this._sessionService.getSessions().then(sessions => {
            this.sessions = this._sessionService.formattedSessions;
                this.activeSessions = this._sessionService.activeSessions;
                this.hours = this._sessionService.hours;
        })

        this._sessionService.sessionsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.activeSessions = this._sessionService.activeSessions;
            this.hours = this._sessionService.hours;
        })
    }
}
