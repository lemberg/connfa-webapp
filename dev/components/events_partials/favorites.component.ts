import {Component} from "@angular/core";
import {Event} from "../../models/event";
import {SessionService} from "../../services/session.service";

declare var moment: any;

@Component({
    selector: 'favorites',
    templateUrl: 'app/views/events_partials/favorites.html',
    providers: [],
    directives: [],
    inputs: ['event'],
})

export class FavoritesComponent {

    event;
    // eventChanged = new EventEmitter();

    public constructor(private _sessionService: SessionService) {}

    toggleFavorite(event, isFavorite) {
        event.isFavorite = isFavorite;
        this._bofService.toggleFavorite(event, isFavorite);
        // @todo write to localForge
    }


}
