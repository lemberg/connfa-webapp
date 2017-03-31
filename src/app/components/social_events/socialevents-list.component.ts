import {OnInit, Component, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";
import {EventComponent} from "../event-component";
import {WindowService} from "../../services/window.service";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    templateUrl: '../../views/events_partials/menu.html',
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
    public router = 'socialevents';
    public event_type = 'social';

    constructor(protected _eventService:EventService, protected _windowService: WindowService, protected _router: Router) {
        super();
    }

    ngOnInit():any {
        this._eventService.getEventsByType('social').then((events:Event[]) => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
            this.redirectToFirst(this.activeEvents);
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
            this.redirectToFirst(this.activeEvents);
        })

        jQuery('body').addClass('view');
    }

    ngOnDestroy():any {
        jQuery('body').removeClass('view');
    }
}
