import {Component, Input, OnInit} from "@angular/core";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event";

@Component({
    selector: 'favorites',
    templateUrl: '../../views/events_partials/favorites.html',
})

export class FavoritesComponent{

    @Input('eventItem') eventItem:any;
    public constructor(private _eventService:EventService) {

    }

    toggleFavorite(event:Event, isFavorite:boolean) {
        event.isFavorite = isFavorite;
        this._eventService.toggleFavorite(event, event.event_type);
    }
}
