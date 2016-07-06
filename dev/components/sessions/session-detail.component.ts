import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SessionsListComponent} from "./sessions-list.component";
import {SessionService} from "../../services/session.service";

declare var moment: any;

@Component({
    templateUrl: 'app/views/sessions/detail.html',
    directives: [FavoritesComponent, SessionsListComponent, ROUTER_DIRECTIVES],
})

export class SessionDetailComponent implements OnInit{

    public event;

    constructor(private _sessionService: SessionService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._sessionService.getSession(params['id']).then((event)=> {
                    this.event = this.transform(event);
                })

                this._sessionService.sessionsChanged$.subscribe((data) => {
                    this._sessionService.getSession(params['id']).then((event)=> {
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
