import {Component, OnInit} from "@angular/core";
import {SchedulerService} from "../../services/scheduler.service";

@Component({
    selector: 'scheduler-list',
    templateUrl: 'app/views/scheduler/menu.html'
})

export class SchedulerListComponent implements OnInit {

    public activeEvents;

    public constructor(private _schedulerService: SchedulerService) {}

    ngOnInit():any {
        this._schedulerService.getSchedulers().then(schedulers => {
            this.activeEvents = this._schedulerService.activeEvents;
            console.log(Object.keys(this.activeEvents));
        });
    }

    public getKeys(events) {
        return Object.keys(events);
    }
}
