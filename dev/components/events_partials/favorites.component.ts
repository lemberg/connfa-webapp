import {Component, EventEmitter} from "@angular/core";
import {Event} from "../../models/event";

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

    toggleFavorite(event) {

        event.isFavorite = !event.isFavorite;
        // this.eventChanged.emit(event);
        // @todo write to localForge
    }


}
