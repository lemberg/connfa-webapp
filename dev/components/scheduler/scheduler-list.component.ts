import {Component, OnInit} from "@angular/core";
import {SchedulerService} from "../../services/scheduler.service";
import {Ucfirst} from "../../pipes/ucfirst.pipe";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";

@Component({
    selector: 'scheduler-list',
    pipes: [Ucfirst],
    directives: [ROUTER_DIRECTIVES, FavoritesComponent],
    templateUrl: 'app/views/scheduler/menu.html'
})

export class SchedulerListComponent implements OnInit {

    public activeEvents;

    public constructor(private _schedulerService:SchedulerService) {
    }

    ngOnInit():any {
        this._schedulerService.getSchedulers().then(schedulers => {
            this._mapData();
        });

        this._schedulerService.eventsChanged$.subscribe(schedulers => {
            this._mapData();
        });
    }

    public getKeys(events) {
        return Object.keys(events);
    }

    private _mapData() {
        this.activeEvents = this._schedulerService.activeEvents;
    }
}
