import {OnInit, Component, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";
import {ListDetailsComponent} from "../events_partials/list-details.component";
import {Event} from "../../models/event";
import {EventComponent} from "../event-component";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    templateUrl: '../../views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent, ListDetailsComponent],
    providers: [EventService],
})

export class SocialeventsListComponent extends EventComponent implements OnInit, OnDestroy {

    public socialevents:Event[] = [];
    public activeEvents:any[] = [];
    public hours:any[] = [];
    public noMatches:boolean = false;
    public dates:string[] = [];
    public activeDate:any;

    public title = 'Social Events';
    public router = '/socialevents/';
    public event_type = 'social';

    constructor(protected _eventService:EventService) {
        super();
    }

    ngOnInit():any {
        this._eventService.getEventsByType('social').then((events:Event[]) => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
            this._eventService.setActiveDate(this.activeDate, true);
        })

        this._eventService.eventsChanged$.subscribe((data:Event[]|string) => {
            console.log('CHANGED');
            this.noMatches = false;
            if (!this.getKeys(this._eventService.activeEvents).length && data === 'filtered') {
                this.noMatches = true;
            }
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
        })

        jQuery('body').addClass('view');
    }

    ngOnDestroy():any {
        jQuery('body').removeClass('view');
    }
}
