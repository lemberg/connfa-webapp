import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";
import {EventService} from "../../services/event.service";
import * as moment from 'moment';
import {Event} from "../../models/event";

@Component({
    selector: 'event-details',
    templateUrl: '../../views/events_partials/details.html',
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit {

    public event:Event;
    public parentRoute:string = '/sessions';
    public title:string = 'Sessions';
    public canView:boolean = false;

    constructor(private _eventService:EventService, private _router:ActivatedRoute) {
    }

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id = params['id'];
            if (id) {
                this._getEvent(id).then((event:Event) => {
                    var activeDate = moment(event.from, moment.ISO_8601).format('ddd D');
                    this._eventService.setActiveDate(activeDate);
                });

                this._eventService.eventsChanged$.subscribe((data:Event[]) => {
                    this._getEvent(id);
                })
            }
        })
    }

    private _getEvent(id:number) {
        return this._eventService.getEvent(id, 'session').then((event:Event)=> {
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
