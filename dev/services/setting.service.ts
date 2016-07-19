import {Injectable, Inject} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()

export class SettingService {

    private _localforage;

    constructor(@Inject('localforage') localforage) {
        this._localforage = localforage;
    }

    settings;

    getSetting(id) {
        var instance = this._localforage.createInstance({
            name: 'settings'
        });

        return instance.getItem(id);
    }
}
