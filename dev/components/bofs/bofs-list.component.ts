import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {BofService} from "../../services/bof.service";
import {FilterComponent} from "../events_partials/filter.component";
import {SessionService} from "../../services/session.service";

declare var moment:any;

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/bofs/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class BofsListComponent implements OnInit {

    bofs = [];
    activeBofs = [];
    hours = [];

    constructor(private _bofService:BofService) {
    }

    ngOnInit():any {
        this._bofService.getBofs().then(bofs => {
            this.bofs = this._bofService.formattedBofs;
            this.activeBofs = this._bofService.activeBofs;
            this.hours = this._bofService.hours;
        })

        this._bofService.bofsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.activeBofs = this._bofService.activeBofs;
            this.hours = this._bofService.hours;
        })
    }
}
