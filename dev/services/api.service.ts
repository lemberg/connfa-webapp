import {Injectable, Inject} from "@angular/core";

import {Observable} from "rxjs/Rx";
import {Http, Headers} from "@angular/http";

@Injectable()

export class ApiService {

    private _config;
    private _localforage;

    constructor(private _http:Http, @Inject('config') config, @Inject('localforage') localforage) {
        this._config = config;
        this._localforage = localforage;
    }

    grabUpdates() {
        // var instance = this._localforage.createInstance({name: 'updates'});
        // instance.getItem('lastUpdate').then(lastUpdate => {
        //     this._loadService('checkUpdates', lastUpdate).then((response) => {
        //         if (response && response.idsForUpdate) {
        //             response.idsForUpdate.forEach((method) => {
        //                 switch (method) {
        //                     case 1:
        //                         this.grabData('getTypes', 'types', 'typeId', null, lastUpdate)
        //                         break;
        //                     case 2:
        //                         this.grabData('getLevels', 'levels', 'levelId', null, lastUpdate)
        //                         break;
        //                     case 3:
        //                         this.grabData('getTracks', 'tracks', 'trackId', null, lastUpdate)
        //                         break;
        //                     case 4:
        //                         this.grabData('getSpeakers', 'speakers', 'speakerId', null, lastUpdate);
        //                         break;
        //                     case 5:
        //                         this.grabData('getLocations', 'locations', 'locationId', null, lastUpdate);
        //                         break;
        //                     case 6:
        //                         this.grabData('getFloorPlans', 'floors', 'floorPlanId', 'floorPlans', lastUpdate);
        //                         break;
        //                     case 7:
        //                         this.grabEvents('getSessions', 'events', 'session', lastUpdate);
        //                         break;
        //                     case 8:
        //                         this.grabEvents('getBofs', 'events', 'bof', lastUpdate);
        //                         break;
        //                     case 9:
        //                         this.grabEvents('getSocialEvents', 'events', 'social', lastUpdate);
        //                         break;
        //                     case 11:
        //                         this.grabData('getInfo', 'pages', 'infoId', 'info', lastUpdate);
        //                         break;
        //                 }
        //             })
        //         }
        //     })
        // });
    }

    grabEvents(api, table, eventType, since = '') {
        var instance = this._localforage.createInstance({
            name: table
        });

        var speakers_instance = this._localforage.createInstance({
            name: 'speakers_events'
        });

        this._loadService(api, since).then(response => {
            var speakers_events = [];
            response.days.forEach(day => {
                day.events.forEach(event => {
                    if (event.deleted) {
                        instance.removeItem(event.eventId.toString());
                        if (event.speakers) {
                            event.speakers.forEach((speakerId) => {
                                speakers_instance.getItem(speakerId.toString()).then((value) => {
                                    var index = value.indexOf(event.eventId.toString());
                                    value.splice(index, 1);
                                    speakers_events[speakerId.toString()] = value;
                                })
                            });
                        }
                    } else {
                        event.event_type = eventType;
                        instance.setItem(event.eventId.toString(), event);

                        if (event.speakers) {
                            event.speakers.forEach((speakerId) => {

                                if (!speakers_events[speakerId.toString()]) {
                                    speakers_events[speakerId.toString()] = [];
                                }

                                speakers_events[speakerId.toString()].push(event.eventId.toString());

                            })
                        }

                    }
                });
            });
            speakers_events.forEach((value, key) => {
                speakers_instance.setItem(key.toString(), value);
            })
        });
    }

    grabData(api, table, itemId, responseItem = null, since = '') {

        if (!responseItem) {
            responseItem = table;
        }

        var instance = this._localforage.createInstance({
            name: table
        });

        this._loadService(api, since).then(response => {
            response[responseItem].forEach(item => {
                if (item.deleted) {
                    instance.removeItem(item[itemId].toString());
                } else {
                    instance.setItem(item[itemId].toString(), item);
                }
            });
        })
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
