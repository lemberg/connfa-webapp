import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {BofsListComponent} from "./bofs-list.component";
import {EventService} from "../../services/event.service";

declare var moment: any;

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [FavoritesComponent, BofsListComponent, ROUTER_DIRECTIVES],
})

export class BofDetailComponent implements OnInit{

    public event;
    public parentRoute = '/bofs';
    public title = 'BOFs';

    constructor(private _eventService: EventService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._eventService.getEvent(params['id'], 'bof').then((event)=> {
                    this.event = this.transform(event);
                })

                this._eventService.eventsChanged$.subscribe((data) => {
                    this._eventService.getEvent(params['id'], 'bof').then((event)=> {
                        this.event = this.transform(event);
                    })
                })
            })
        }
    }

    private transform(event) {
        var transformed = event;
        console.log(event);
        transformed.timeLabel = moment(event.from).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }
}
