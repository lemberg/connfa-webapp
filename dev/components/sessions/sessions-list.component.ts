import {Component, OnInit} from "angular2/core";
import {RouteConfig} from "angular2/router";
import {SessionDetailComponent} from "./session-detail.component";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";

declare var moment: any;

@Component({
    template: `<p>Hello in sessions</p>`,
    providers: [EventService]
})

@RouteConfig([
    {
        path: '/',
        name: 'List',
        component: SessionDetailComponent,
    },
])

export class SessionsListComponent implements OnInit{

    sessions: Event[];

    constructor(private _eventService: EventService) {}

    ngOnInit():any {
        this._eventService.getEventsByType('session').then(sessions => {
            var dates = this.transformEvents(sessions);
        });
    }

    private transformEvents(events) {
        var transformed = [];
        return new Promise((resolve, reject) => {
            events.forEach((event: Event) => {
                var event_day = moment(event.from).format('ddd D');

                if (!transformed[event_day]) {
                    transformed[event_day] = [];
                }
                transformed[event_day].push(event);
            });

            return resolve(transformed);
        });
    }
}
