import {Injectable, Inject} from "@angular/core";
import {EventService} from "./event.service";

@Injectable()

export class FilterService {

    private _localforage;

    public constructor(private _eventService:EventService, @Inject('localforage') localforage) {
        this._localforage = localforage;
    }

    public filterEvents(levels, tracks, type) {
        this._eventService.filterEvents(levels, tracks, type);
        var instance = this._localforage.createInstance({
            name: 'filters'
        });

        var data = {
            levels: levels,
            tracks: tracks,
        }

        instance.setItem('filters', data);
    }

    public getFilters() {

        var filterInstance = this._localforage.createInstance({
            name: 'filters'
        });
        return filterInstance.getItem('filters');
    }
}
