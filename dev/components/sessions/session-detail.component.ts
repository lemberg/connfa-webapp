import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from "angular2/router";
import {EventService} from "../../services/event.service";
import {FavoritesComponent} from "../events_partials/favorites.component";

declare var moment: any;

@Component({
    templateUrl: 'app/views/sessions/detail.html',
    providers: [EventService],
    directives: [FavoritesComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit{

    public event;

    constructor(private _eventService: EventService, private _routerParams: RouteParams) {}

    ngOnInit():any {

        if (this._routerParams.get('id')) {
            this._eventService.getEvent(this._routerParams.get('id'), 'session').then((event)=> {
                this.event = this.transform(event);
            })
        }
    }

    private transform(event) {
        var transformed = event;
        transformed.timeLabel = moment(event.fom).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }

}
