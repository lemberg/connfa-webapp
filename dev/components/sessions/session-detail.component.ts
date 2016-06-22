import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";
import {EventService} from "../../services/event.service";

@Component({
    templateUrl: 'app/views/sessions/detail.html',
    providers: [EventService],
    directives: [ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit{

    public event;

    constructor(private _eventService: EventService, private _routerParams: RouteParams) {}

    ngOnInit():any {

        if (this._routerParams.get('id')) {
            this._eventService.getEvent(this._routerParams.get('id'), 'session').then((event)=> {
                this.event = event;
            })
        }
    }

}
