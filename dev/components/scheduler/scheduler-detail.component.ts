import {Component} from "@angular/core";
import {SchedulerListComponent} from "./scheduler-list.component";
import {SchedulerService} from "../../services/scheduler.service";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [SchedulerListComponent, FavoritesComponent, ROUTER_DIRECTIVES],
})

export class SchedulerDetailComponent {

    public event;
    public canView = false;

    constructor(private _schedulerService: SchedulerService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._schedulerService.getScheduler(params['id']).then((event)=> {
                    this.event = event;
                    if (event && event.href) {
                        this.canView = true;
                    }
                })

                this._schedulerService.eventsChanged$.subscribe((data) => {
                    this._schedulerService.getScheduler(params['id']).then((event)=> {
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
