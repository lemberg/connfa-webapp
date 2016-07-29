
import {Component, ElementRef, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";

declare var moment: any;
declare var jQuery: any;

@Component({
    selector: 'bofs',
    templateUrl: 'app/views/bofs/bofs.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EventService],
})

export class BofsComponent implements OnInit{

    public dates;
    public activeDate;

    public constructor(private _eventService: EventService) {
    }

    ngOnInit():any {
        this._eventService.getEventsByType('bof').then(bofs => {
            this._mapData();
        });

        this._eventService.eventsChanged$.subscribe(date => {
            this._mapData();
        });

        jQuery('body').addClass('view');
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
