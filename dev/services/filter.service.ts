import {Injectable} from "@angular/core";
import {EventService} from "./event.service";

@Injectable()

export class FilterService {

    public constructor(private _eventService: EventService) {}

    public filterEvents(levels, tracks, type) {
        console.log(levels, tracks, type);
        this._eventService.filterEvents(levels, tracks, type);
    }
}
