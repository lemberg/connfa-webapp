import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class SocialeventsListComponent implements OnInit {

    socialevents = [];
    activeEvents = [];
    hours = [];
    noMatches = false;

    public router = '/socialevents/';
    public event_type = 'social';

    constructor(private _eventService:EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('social').then(bofs => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
        })

        this._eventService.eventsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.noMatches = false;
            if (!this.getKeys(this._eventService.activeEvents).length) {
                this.noMatches = true;
            }
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
        })
    }

    public getKeys(obj) {
        return Object.keys(obj)
    }
}
