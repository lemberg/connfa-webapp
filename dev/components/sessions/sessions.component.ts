
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";

declare var moment: any;
declare var jQuery: any;

@Component({
    selector: 'sessions',
    templateUrl: 'app/views/sessions/sessions.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EventService],
})

export class SessionsComponent implements OnInit{

    public sessions;
    public dates;
    public activeDate;

    public constructor(private _eventService: EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('session').then(sessions => {
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
        });

        this._eventService.eventsChanged$.subscribe(date => {
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
        });

        jQuery('body').addClass('view');
    }

    public setActiveDate(date) {
        this._eventService.setActiveDate(date);
        this.activeDate = date;
    }
}
