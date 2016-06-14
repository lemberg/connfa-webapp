import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Speaker} from "../models/speaker";

@Injectable()

export class ApiService {

    private _config;
    private _localforage;

    constructor(private _http:Http, @Inject('config') config, @Inject('localforage') localforage) {
        this._config = config;
        this._localforage = localforage;

        var instance = this._localforage.createInstance({name: 'speakers'});
        instance.keys().then(keys => {
            console.log(keys);
        })

        // var instance = this._localforage.createInstance('speakers');
        // instance.keys().then(keys => {
        //
        // });
        // instance.keys().then((speaker) => {
        //     console.log(speaker);
        // });
        // console.log(this._localforage.all());
    }

    getUpdates(since = '') {
        // this._loadService('checkUpdates', since).then((response) => {
        //     if (response && response.idsForUpdate) {
        //         response.idsForUpdate.forEach((method) => {
        //             switch (method) {
        //                 case 4:
        //                     this.getSpeakers(since);
        //                     break;
        //                 case 5:
        //                     this.getLocations(since);
        //             }
        //         })
        //     }
        // })
        // this._localforage.getItem('test').then(() => {
        //     console.log(1);
        // });
    }

    getSpeakers(since = '') {
        var instance = this._localforage.createInstance({
            name: "speakers"
        });
        this._loadService('getSpeakers', since).then((response) => {
           response.speakers.forEach((speaker: Speaker) => {
               instance.setItem(speaker.speakerId.toString(), speaker)
           })
        });
    }

    getLocations(since = '') {
        var instance = this._localforage.createInstance({name: 'locations'});
        this._loadService('getLocations', since).then((response) => {
            response.locations.forEach(location => {
                instance.setItem(location.locationId.toString(), location)
            })
        });
    }

    private _loadService(service, since) {
        var observer = this._http.get(this._config.apiUrl + service)
            .map(response => response.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error.json());
            });

        return new Promise((resolve, reject) => {
            observer.subscribe(function (res) {
                resolve(res);
            });
        })
    }
}
