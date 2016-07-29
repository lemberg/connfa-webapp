import {Component} from "@angular/core";
import {EventService} from "../../services/event.service";

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

    public constructor(private _eventService:EventService) {
    }

    toggleFavorite(event, isFavorite) {
        event.isFavorite = isFavorite;
        this._eventService.toggleFavorite(event, event.event_type);
    }
}
