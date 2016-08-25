import {Component, OnInit, OnDestroy} from "@angular/core";
import {SchedulerService} from "../../services/scheduler.service";
import {Ucfirst} from "../../pipes/ucfirst.pipe";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ListDetailsComponent} from "../events_partials/list-details.component";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    pipes: [Ucfirst],
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, ListDetailsComponent],
    providers: [SchedulerService],
    templateUrl: '../../views/scheduler/menu.html'
})

export class SchedulerListComponent implements OnInit, OnDestroy {

    public activeEvents:any;
    public dates:string[];
    public activeDate:string;

    public constructor(private _schedulerService:SchedulerService) {
    }

    ngOnInit():void {
        this._schedulerService.getSchedulers().then((schedulers:any) => {
            this._mapData();
        });

        this._schedulerService.eventsChanged$.subscribe((schedulers:any) => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():void {
        jQuery('body').removeClass('view');
    }

    public getKeys(object:Object):string[] {
        return Object.keys(object);
    }

    public setActiveDate(date:string):void {
        this._schedulerService.setActiveDate(date, true);
        this.activeDate = date;
    }

    private _mapData():void {
        this.activeEvents = this._schedulerService.activeEvents;
        this.dates = this._schedulerService.dates;
        this.activeDate = this._schedulerService.activeDate;
    }
}
