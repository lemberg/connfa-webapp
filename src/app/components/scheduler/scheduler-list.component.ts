import {Component, OnInit, OnDestroy} from "@angular/core";
import {SchedulerService} from "../../services/scheduler.service";
import {EventComponent} from "../event-component";

declare var jQuery: any;

@Component({
    selector: 'events-list',
    providers: [SchedulerService],
    templateUrl: '../../views/scheduler/menu.html'
})

export class SchedulerListComponent extends EventComponent implements OnInit, OnDestroy {

    public activeEvents:any;
    public dates:string[];
    public activeDate:string;

    public constructor(private _schedulerService:SchedulerService) {
        super();
    }

    ngOnInit():void {
        this._schedulerService.getSchedulers().then((schedulers:any) => {
            this._mapData();
            this._schedulerService.setActiveDate(this.activeDate, true)
        });

        this._schedulerService.eventsChanged$.subscribe((schedulers:any) => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():void {
        jQuery('body').removeClass('view');
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
