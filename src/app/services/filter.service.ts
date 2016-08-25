import {Injectable, Inject} from "@angular/core";
import {EventService} from "./event.service";
import {Level} from "../models/level";
import {Track} from "../models/track";

@Injectable()

export class FilterService {

    private _localforage:any;

    public constructor(private _eventService:EventService, @Inject('localforage') localforage:any) {
        this._localforage = localforage;
    }

    public filterEvents(levels:Level[], tracks:Track[], type:string) {
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
