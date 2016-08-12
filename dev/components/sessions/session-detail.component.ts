import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";
import {EventService} from "../../services/event.service";
import moment from 'moment';

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit {

    public event;
    public parentRoute = '/sessions';
    public title = 'Sessions';
    public canView = false;

    constructor(private _eventService:EventService, private _router:ActivatedRoute) {
    }

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id = params['id'];
            this._getEvent(id).then((event) => {
                var activeDate = moment(event.from, moment.ISO_8601).format('ddd D');
                this._eventService.setActiveDate(activeDate);
            });

            this._eventService.eventsChanged$.subscribe((data) => {
                this._getEvent(id);
            })
        })
    }

    private _getEvent(id) {
        return this._eventService.getEvent(id, 'session').then((event)=> {
            return new Promise((resolve, reject) => {
                this.event = event;
                resolve(event);
                if (!event || this._eventService.isNonClickable(event.type)) {
                    this.canView = false;
                } else {
                    this.canView = true;
                }
            });
        })
    }
}
