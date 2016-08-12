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
    templateUrl: 'app/views/scheduler/menu.html'
})

export class SchedulerListComponent implements OnInit, OnDestroy {

    public activeEvents;
    public dates;
    public activeDate;

    public constructor(private _schedulerService:SchedulerService) {
    }

    ngOnInit():any {
        this._schedulerService.getSchedulers().then(schedulers => {
            this._mapData();
        });

        this._schedulerService.eventsChanged$.subscribe(schedulers => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():any {
        jQuery('body').removeClass('view');
    }

    public getKeys(events) {
        return Object.keys(events);
    }

    public setActiveDate(date) {
        this._schedulerService.setActiveDate(date);
        this.activeDate = date;
    }

    private _mapData() {
        this.activeEvents = this._schedulerService.activeEvents;
        this.dates = this._schedulerService.dates;
        this.activeDate = this._schedulerService.activeDate;
    }
}
