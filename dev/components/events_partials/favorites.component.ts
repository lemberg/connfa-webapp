import {Component} from "@angular/core";
import {Event} from "../../models/event";
import {SessionService} from "../../services/session.service";
import {BofService} from "../../services/bof.service";
import {SocialeventService} from "../../services/socialevent.service";

declare var moment:any;

@Component({
    selector: 'favorites',
    templateUrl: 'app/views/events_partials/favorites.html',
    providers: [],
    directives: [],
    inputs: ['event'],
})

export class FavoritesComponent {

    event;

    public constructor(private _sessionService:SessionService,
                       private _bofService:BofService,
                       private _socialService:SocialeventService) {
    }

    toggleFavorite(event, isFavorite) {
        event.isFavorite = isFavorite;
        switch (event.event_type) {
            case 'session':
                this._sessionService.toggleFavorite(event, isFavorite);
                break;
            case 'bof':
                this._bofService.toggleFavorite(event, isFavorite);
                break;
            case 'social':
                this._socialService.toggleFavorite(event, isFavorite);
                break;
        }
    }
}
