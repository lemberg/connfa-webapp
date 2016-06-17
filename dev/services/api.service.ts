import {Injectable, Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Speaker} from "../models/speaker";

@Injectable()

export class ApiService {

    private _config;
    private _localforage;

    constructor(private _http:Http, @Inject('config') config, @Inject('localforage') localforage) {
        this._config = config;
        this._localforage = localforage;
    }

    grabUpdates() {
        var instance = this._localforage.createInstance({name: 'updates'});
        instance.getItem('lastUpdate').then(lastUpdate => {
            this._loadService('checkUpdates', lastUpdate).then((response) => {
                if (response && response.idsForUpdate) {
                    response.idsForUpdate.forEach((method) => {
                        switch (method) {
                            case 4:
                                this.grabSpeakers(lastUpdate);
                                break;
                            case 5:
                                this.grabLocations(lastUpdate);
                                break;
                            case 6:
                                this.grabFloorPlans(lastUpdate);
                                break;
                            case 11:
                                this.grabInfo(lastUpdate);
                                break;
                        }
                    })
                }
            })
        });
    }

    grabSpeakers(since = '') {
        var instance = this._localforage.createInstance({
            name: "speakers"
        });
        this._loadService('getSpeakers', since).then((response) => {
            response.speakers.forEach((speaker:Speaker) => {
                if (speaker.deleted) {
                    instance.removeItem(speaker.speakerId.toString())
                } else {
                    instance.setItem(speaker.speakerId.toString(), speaker)
                }
            })
        });
    }

    grabFloorPlans(since='') {
        var instance = this._localforage.createInstance({name: 'floors'});
        this._loadService('getFloorPlans', since).then((response) => {
            response.floorPlans.forEach(plan => {
                if (plan.deleted) {
                    instance.removeItem(plan.floorPlanId.toString())
                } else {
                    instance.setItem(plan.floorPlanId.toString(), plan)
                }
            })
        });
    }

    grabInfo(since='') {
        var instance = this._localforage.createInstance({name: 'pages'});
        this._loadService('getInfo', since).then((response) => {
            response.info.forEach(info => {
                if (info.deleted) {
                    instance.removeItem(info.infoId.toString())
                } else {
                    instance.setItem(info.infoId.toString(), info)
                }
            })
        });
    }

    grabLocations(since = '') {
        var instance = this._localforage.createInstance({name: 'locations'});
        this._loadService('getLocations', since).then((response) => {
            response.locations.forEach(location => {
                if (location.deleted) {
                    instance.removeItem(location.speakerId.toString())
                } else {
                    instance.setItem(location.locationId.toString(), location)
                }
            })
        });
    }

    getCollection(name) {
        var instance = this._localforage.createInstance({
            name: name
        });

        return new Promise((resolve, reject) => {

            instance.keys().then(keys => {
                var promises = [];
                keys.forEach(key => {
                    promises.push(instance.getItem(key))
                })

                Promise.all(promises).then((collection) => {
                    resolve(collection);
                })
            });
        })
    }

    private _loadService(service, since) {
        var headers = new Headers();
        if (since) {
            headers.append('If-Modified-Since', since);
        }

        var observer = this._http.get(this._config.apiUrl + service, {
                headers: headers
            })
            .map(response => {
                if (service == 'checkUpdates') {
                    var instance = this._localforage.createInstance({name: 'updates'});
                    instance.setItem('lastUpdate', response.headers.get('Last-Modified'));
                }

                return response.json()
            })
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
