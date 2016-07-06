import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {FilterComponent} from "../events_partials/filter.component";

declare var moment: any;

@Component({
    selector: 'sessions-list',
    templateUrl: 'app/views/sessions/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class SessionsListComponent implements OnInit{

    sessions;
    activeSessions;
    dates;
    activeDate;
    hours;

    constructor(private _sessionService: SessionService) {}

    ngOnInit():any {
        this._sessionService.getSessions().then(sessions => {
            this.sessions = this._sessionService.formatedSessions;
            this.activeSessions = this._sessionService.activeSessions;
            this.activeDate = this._sessionService.activeDate;
            this.dates = this._sessionService.dates;
            this.hours = this._sessionService.hours;
        });

        this._sessionService.sessionsChanged$.subscribe(date => {
            this.activeSessions = this._sessionService.activeSessions;
            this.hours = this._sessionService.hours;
        })
    }

    toggleFavorite(event) {
        event.isFavorite = !event.isFavorite;
        // @todo write to localForge
    }
}
