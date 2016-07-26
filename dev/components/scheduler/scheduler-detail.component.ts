import {Component} from "@angular/core";
import {SchedulerListComponent} from "./scheduler-list.component";
import {SchedulerService} from "../../services/scheduler.service";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";

declare var moment: any;

@Component({
    selector: 'scheduler-list',
    templateUrl: 'app/views/scheduler/detail.html',
    directives: [SchedulerListComponent, FavoritesComponent, ROUTER_DIRECTIVES],
})

export class SchedulerDetailComponent {

    public event;

    constructor(private _schedulerService: SchedulerService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._schedulerService.getScheduler(params['id']).then((event)=> {
                    this.event = this.transform(event);
                })

                this._schedulerService.eventsChanged$.subscribe((data) => {
                    this._schedulerService.getScheduler(params['id']).then((event)=> {
                        this.event = this.transform(event);
                    })
                })
            })
        }
    }

    private transform(event) {
        var transformed = event;
        transformed.timeLabel = moment(event.fom).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }
}
