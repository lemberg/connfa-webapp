import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";
import {EventService} from "../../services/event.service";

declare var moment: any;

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit{

    public event;
    public parentRoute = '/sessions';
    public title = 'Sessions';

    constructor(private _eventService: EventService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._eventService.getEvent(params['id'], 'session').then((event)=> {
                    this.event = this.transform(event);
                })

                this._eventService.eventsChanged$.subscribe((data) => {
                    this._eventService.getEvent(params['id'], 'session').then((event)=> {
                        this.event = this.transform(event);
                    })
                })
            })
        }
    }

    private transform(event) {
        var transformed = event;
        transformed.timeLabel = moment(event.from).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }
}
