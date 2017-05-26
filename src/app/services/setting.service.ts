import {Injectable, Inject, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()

export class SettingService {

    public settings:any;

    private _localforage:any;
    public settingsChanged$:EventEmitter<any>;


    constructor(@Inject('localforage') localforage:any, private _apiService: ApiService) {
        this._localforage = localforage;

        this.settingsChanged$ =  new EventEmitter();

        this._apiService.dataChanged$.subscribe((data:any) => {
            this.settings = [];
            this._apiService.getKeyValues('settings').then((settings:any) => {
                this.settingsChanged$.emit(settings);
            });
        })
    }

    public getSetting(id:string) {
        var instance = this._localforage.createInstance({
            name: 'settings'
        });

        return instance.getItem(id);
    }
}
