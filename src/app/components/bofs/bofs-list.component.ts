import {OnInit, Component, OnDestroy} from "@angular/core";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";
import {EventComponent} from "../event-component";

declare var jQuery:any;

@Component({
    selector: 'events-list',
    templateUrl: '../../views/events_partials/menu.html',
    providers: [EventService],
})


export class BofsListComponent extends EventComponent implements OnInit, OnDestroy {

    public bofs:Event[] = [];
    public activeEvents:any = [];
    public hours:string[] = [];
    public noMatches:boolean = false;
    public dates:string[] = [];
    public activeDate:string;

    public title:string = 'BOFs';
    public router:string = '/bofs/';
    public event_type:string = 'bof';

    constructor(protected _eventService:EventService) {
        super();
    }

    ngOnInit():void {
        this._eventService.getEventsByType('bof').then((bofs:Event[]) => {
            this.activeEvents = this._eventService.activeEvents;
            this.hours = this.getKeys(this._eventService.activeEvents);
            this.dates = this._eventService.dates;
            this.activeDate = this._eventService.activeDate || this.dates[0];
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

    ngOnDestroy():void {
        jQuery('body').removeClass('view');
    }
}
