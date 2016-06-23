import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {SessionDetailComponent} from "./session-detail.component";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";
import {FavoritesComponent} from "../events_partials/favorites.component";

declare var moment: any;

@Component({
    templateUrl: 'app/views/sessions/menu.html',
    providers: [EventService],
    directives: [ROUTER_DIRECTIVES, FavoritesComponent],
})

@RouteConfig([
    {
        path: '/:id',
        name: 'Show',
        component: SessionDetailComponent,
    },
    {
        path: '/',
        name: 'List',
        component: SessionDetailComponent,
    },
])

export class SessionsListComponent implements OnInit{

    sessions;
    activeSessions;
    dates;
    activeDate;
    hours;

    constructor(private _eventService: EventService) {}

    ngOnInit():any {
        this._eventService.getEventsByType('session').then(sessions => {
            this.transformEvents(sessions).then(data => {
                this.sessions = data;
                this.dates = this.getDates(data);
                this.activeDate = this.dates[0];
                this.activeSessions = this.sessions[this.activeDate];
                this.hours = Object.keys(this.activeSessions);
            })

        });
    }

    setActiveDate(date) {
        this.activeDate = date;
        this.activeSessions = this.sessions[this.activeDate];
        this.hours = Object.keys(this.activeSessions);
    }

    toggleFavorite(event) {
        event.isFavorite = !event.isFavorite;
        // @todo wrote to localForge
    }

    private transformEvents(events) {
        var transformed = [];
        return new Promise((resolve, reject) => {
            events.forEach((event: Event) => {
                var event_day = moment(event.from).format('ddd D');
                var event_hours = moment(event.from).format('LT') +' '+ moment(event.to).format('LT');

                if (!transformed[event_day]) {
                    transformed[event_day] = [];
                }

                if (!transformed[event_day][event_hours]) {
                    transformed[event_day][event_hours] = [];
                }

                transformed[event_day][event_hours].push(this.transformEvent(event));
            });

            return resolve(transformed);
        });
    }

    private transformEvent(event) {
        var transformed = event;
        transformed.fromLabel = moment(event.from).format('LT');
        transformed.toLabel = moment(event.to).format('LT');
        transformed.isFavorite = false; //@todo

        return transformed;
    }

    private getDates(data) {
        return Object.keys(data);
    }
}
