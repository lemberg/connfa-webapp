
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";

declare var moment: any;
declare var jQuery: any;

@Component({
    selector: 'sessions',
    templateUrl: 'app/views/sessions/sessions.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EventService],
})

export class SessionsComponent implements OnInit, OnDestroy{

    public sessions;
    public dates;
    public activeDate;

    public constructor(private _eventService: EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('session').then((sessions: Event[]) => {
            this._mapData();
        });

        this._eventService.eventsChanged$.subscribe(data => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():any {
        jQuery('body').removeClass('view');
    }

    public setActiveDate(date) {
        this._eventService.setActiveDate(date);
        this.activeDate = date;
    }

    private _mapData() {
        this.dates = this._eventService.dates;
        this.activeDate = this._eventService.activeDate || this.dates[0];
    }
}
