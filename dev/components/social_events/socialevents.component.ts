
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";

declare var jQuery: any;

@Component({
    templateUrl: 'app/views/socialevents/socialevents.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EventService],
})

export class SocialeventsComponent implements OnInit, OnDestroy{

    public dates;
    public activeDate;

    public constructor(private _eventService: EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('social').then(bofs => {
            this._mapData();
        });

        this._eventService.eventsChanged$.subscribe(date => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():any {
        jQuery('body').removeClass('view');
    }


    private _mapData() {
        this.dates = this._eventService.dates;
        this.activeDate = this._eventService.activeDate || this.dates[0];
    }

    public setActiveDate(date) {
        this._eventService.setActiveDate(date);
        this.activeDate = date;
    }
}
