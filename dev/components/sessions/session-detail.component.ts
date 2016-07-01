import {Component, OnInit} from "@angular/core";
import {EventService} from "../../services/event.service";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";

declare var moment: any;

@Component({
    templateUrl: 'app/views/sessions/detail.html',
    providers: [EventService],
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit{

    public event;

    constructor(private _eventService: EventService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._eventService.getEvent(params['id'], 'session').then((event)=> {
                    this.event = this.transform(event);
                })
            })
        }
    }

    private transform(event) {
        var transformed = event;
        transformed.timeLabel = moment(event.fom).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }

    navigateToSpeaker(id) {
        // this._router.navigateByUrl('/speakers/'+id);
    }

}
