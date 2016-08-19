import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {FilterComponent} from "../events_partials/filter.component";
import {EventService} from "../../services/event.service";
import {ListDetailsComponent} from "../events_partials/list-details.component";
import {Event} from "../../models/event";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    templateUrl: '../../views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent, ListDetailsComponent],
    providers: [EventService],
})


export class SocialeventsListComponent implements OnInit {

    public socialevents:Event[] = [];
    public activeEvents:any[] = [];
    public hours:any[] = [];
    public noMatches:boolean = false;
    public dates:string[] = [];
    public activeDate:any;

    public title = 'Social Events';
    public router = '/socialevents/';
    public event_type = 'social';

    constructor(private _eventService:EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('social').then((events:Event[]) => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
        })

        this._eventService.eventsChanged$.subscribe((date:Event[]) => {
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

    public setActiveDate(date:string) {
        this._eventService.setActiveDate(date, true);
        this.activeDate = date;
    }

    public getKeys(obj:any) {
        return Object.keys(obj)
    }
}
