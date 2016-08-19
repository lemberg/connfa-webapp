import {Injectable, Inject} from "@angular/core";

@Injectable()

export class SettingService {

    public settings:any;

    private _localforage:any;

    constructor(@Inject('localforage') localforage:any) {
        this._localforage = localforage;
    }

    public getSetting(id:string) {
        var instance = this._localforage.createInstance({
            name: 'settings'
        });

        return instance.getItem(id);
    }
}
