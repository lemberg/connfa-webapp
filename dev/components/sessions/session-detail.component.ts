import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit {

    public event;
    public parentRoute = '/sessions';
    public title = 'Sessions';

    constructor(private _eventService:EventService, private _router:ActivatedRoute) {
    }

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id = params['id'];
            this._getEvent(id);

            this._eventService.eventsChanged$.subscribe((data) => {
                this._getEvent(id);
            })
        })
    }

    private _getEvent(id) {
        this._eventService.getEvent(id, 'session').then((event)=> {
            this.event = event;
        })
    }
}
