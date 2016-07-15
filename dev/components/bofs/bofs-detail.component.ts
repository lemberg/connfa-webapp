import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {BofsListComponent} from "./bofs-list.component";
import {BofService} from "../../services/bof.service";

declare var moment: any;

@Component({
    templateUrl: 'app/views/bofs/detail.html',
    directives: [FavoritesComponent, BofsListComponent, ROUTER_DIRECTIVES],
})

export class BofDetailComponent implements OnInit{

    public event;

    constructor(private _bofService: BofService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._bofService.getBof(params['id']).then((event)=> {
                    this.event = this.transform(event);
                })

                this._bofService.bofsChanged$.subscribe((data) => {
                    this._bofService.getBof(params['id']).then((event)=> {
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
