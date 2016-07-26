import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SchedulerService} from "../../services/scheduler.service";

@Component({
    selector: 'scheduler',
    templateUrl: 'app/views/scheduler/scheduler.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SchedulerService],
})

export class SchedulerComponent implements OnInit{

    public schedulers;
    public dates;
    public activeDate;

    public constructor(private _schedulerService: SchedulerService) {}

    ngOnInit():any {
        this._schedulerService.getSchedulers().then(schedulers => {
            this.dates = this._schedulerService.dates;
            this.activeDate = this._schedulerService.activeDate;
        });
    }

    public setActiveDate(date) {
        this._schedulerService.setActiveDate(date);
        this.activeDate = date;
    }

}
