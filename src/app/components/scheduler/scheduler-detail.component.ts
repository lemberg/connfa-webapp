import {Component} from "@angular/core";
import {SchedulerService} from "../../services/scheduler.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import {Event} from "../../models/event";

@Component({
    selector: 'event-details',
    templateUrl: '../../views/events_partials/details.html',
})

export class SchedulerDetailComponent {

    public event:Event;
    public parentRoute:string = '/scheduler/';
    public title:string = 'My Schedule';
    public canView:boolean = false;

    constructor(private _schedulerService: SchedulerService, private _router: ActivatedRoute) {}

    ngOnInit():void {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._schedulerService.getScheduler(params['id']).then((event:Event)=> {
                    this.event = event;
                    if (event && event.href) {
                        this.canView = true;
                        var activeDate = moment(event.from, moment.ISO_8601).format('ddd D');
                        this._schedulerService.setActiveDate(activeDate);
                    }
                })

                this._schedulerService.eventsChanged$.subscribe((data:Event[]) => {
                    this._schedulerService.getScheduler(params['id']).then((event:Event)=> {
                        this.event = event;
                        if (event && event.href) {
                            this.canView = true;
                        }
                    })
                })
            })
        }
    }
}
