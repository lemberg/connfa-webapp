import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";

declare var moment:any;

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class BofsListComponent implements OnInit {

    bofs = [];
    activeEvents = [];
    hours = [];
    noMatches = false;

    public router = '/bofs/';
    public event_type = 'bof';

    constructor(private _eventService:EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('bof').then(bofs => {
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
