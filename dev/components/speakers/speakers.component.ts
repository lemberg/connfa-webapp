import {Component, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";

@Component({
    directives: [ROUTER_DIRECTIVES, FavoritesComponent],
    templateUrl: 'app/views/speakers/speakers.html',
})

export class SpeakersComponent {

    searchQuery;

    searchSpeaker = function (value) {
        this.searchQuery = value;
    }
}
