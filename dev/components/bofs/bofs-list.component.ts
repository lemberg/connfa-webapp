import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";
import {ListDetailsComponent} from "../events_partials/list-details.component";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent, ListDetailsComponent],
    providers: [EventService],
})


export class BofsListComponent implements OnInit, OnDestroy {

    bofs = [];
    activeEvents = [];
    hours = [];
    noMatches = false;
    dates = [];
    activeDate;

    public title = 'BOFs';
    public router = '/bofs/';
    public event_type = 'bof';

    constructor(private _eventService:EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('bof').then(bofs => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
        })

        this._eventService.eventsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.noMatches = false;
            if (!this.getKeys(this._eventService.activeEvents).length) {
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

    public setActiveDate(date) {
        this._eventService.setActiveDate(date);
        this.activeDate = date;
    }

    public getKeys(obj) {
        return Object.keys(obj)
    }
}
