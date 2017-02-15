import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";
import {ListDetailsComponent} from "../events_partials/list-details.component";
import {Event} from "../../models/event";

declare var jQuery: any;

import {EventComponent} from "../event-component";
import {WindowService} from "../../services/window.service";

@Component({
    moduleId: 'app',
    selector: 'events-list',
    templateUrl: '../../views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent, ListDetailsComponent],
    providers: [EventService],
})


export class SessionsListComponent extends EventComponent implements OnInit, OnDestroy {

    public sessions: Event[] = [];
    public activeEvents: any = [];
    public hours: string[] = [];
    public noMatches: boolean = false;
    public title: string = 'Sessions';
    public router: string = 'sessions';
    public event_type: string = 'session';

    constructor(protected _eventService: EventService, protected _windowService: WindowService, protected _router: Router) {
        super();
    }

    ngOnInit(): void {
        this._eventService.getEventsByType('session').then((sessions: Event[]) => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = Object.keys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
            this.redirectToFirst(this.activeEvents);
        })

        this._eventService.eventsChanged$.subscribe((data: Event[]|string) => {
            console.log('CHANGED');
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
            this.noMatches = false;
            if (!this.getKeys(this._eventService.activeEvents).length && data === 'filtered') {
                this.noMatches = true;
            }
            this.activeEvents = this._eventService.activeEvents;
            this.hours = Object.keys(this._eventService.activeEvents);
            this.redirectToFirst(this.activeEvents);

        })

        jQuery('body').addClass('view');
    }

    ngOnDestroy(): any {
        jQuery('body').removeClass('view');
    }
}
