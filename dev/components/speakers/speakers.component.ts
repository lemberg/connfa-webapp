import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {SpeakerService} from "../../services/speaker.service";

@Component({
    directives: [ROUTER_DIRECTIVES, FavoritesComponent],
    templateUrl: 'app/views/speakers/speakers.html',
})

export class SpeakersComponent implements OnInit{

    public constructor(private _speakerService: SpeakerService) {}

    ngOnInit():any {
        return undefined;
    }

    searchQuery;

    searchSpeaker = function (value) {
        this.searchQuery = value;
        this._speakerService.search(value);
    }
}
