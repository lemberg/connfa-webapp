import {Injectable, Inject, EventEmitter} from "@angular/core";

import {Observable} from "rxjs/Rx";
import {Http, Headers} from "@angular/http";
import {UpdateResponse} from "../models/update_response";
import {SettingsResponse} from "../models/settings_response";
import {EventsResponse} from "../models/events_response";
import {Event} from "../models/event";

@Injectable()

export class ApiService {

    public dataChanged$:EventEmitter<any>;

    private _config:any;
    private _localforage:any;

    constructor(private _http:Http,
                @Inject('config') config:{},
                @Inject('localforage') localforage:any
    ) {

        this._config = config;
        this._localforage = {}
        this._localforage = localforage;
        this.dataChanged$ = new EventEmitter();
        this.dataChanged$.subscribe((entityName:string) => {
            delete this._collectionsPromises[entityName];
        })
    }

    grabUpdates() {

        var instance = this._localforage.createInstance({name: 'updates'});
        instance.getItem('lastUpdate').then((lastUpdate:string) => {
            this._loadService('checkUpdates', lastUpdate).then((response:UpdateResponse) => {
                if (response && response.idsForUpdate) {
                    response.idsForUpdate.forEach((method) => {
                        switch (method) {
                            case 0:
                                this.grabSettings('getSettings', lastUpdate)
                                break;
                            case 1:
                                this.grabData('getTypes', 'types', 'typeId', null, lastUpdate)
                                break;
                            case 2:
                                this.grabData('getLevels', 'levels', 'levelId', null, lastUpdate)
                                break;
                            case 3:
                                this.grabData('getTracks', 'tracks', 'trackId', null, lastUpdate)
                                break;
                            case 4:
                                this.grabData('getSpeakers', 'speakers', 'speakerId', null, lastUpdate);
                                break;
                            case 5:
                                this.grabData('getLocations', 'locations', 'locationId', null, lastUpdate);
                                break;
                            case 6:
                                this.grabData('getFloorPlans', 'floors', 'floorPlanId', 'floorPlans', lastUpdate);
                                break;
                            case 7:
                                this.grabEvents('getSessions', 'events', 'session', lastUpdate);
                                break;
                            case 8:
                                this.grabEvents('getBofs', 'events', 'bof', lastUpdate);
                                break;
                            case 9:
                                this.grabEvents('getSocialEvents', 'events', 'social', lastUpdate);
                                break;
                            case 11:
                                this.grabData('getInfo', 'pages', 'infoId', 'info', lastUpdate);
                                break;
                        }
                    });
                }
            })
        });
    }

    grabSettings(api:string, since:string) {
        var instance = this._localforage.createInstance({
            name: 'settings'
        });

        this._loadService(api, since).then((response:SettingsResponse) => {
            instance.setItem('twitterSearchQuery', response.settings.twitterSearchQuery);
            instance.setItem('twitterWidgetId', response.settings.twitterWidgetId).then(() => {
                this.dataChanged$.emit('settings');
            });
        });
    }

    grabEvents(api:string, entityName:string, eventType:string, since:string = '') {

        var instance = this._localforage.createInstance({
            name: entityName
        });

        this._loadService(api, since).then((response:EventsResponse) => {
            var events:Event[] = [];
            response.days.forEach((day) => {
                day.events.forEach((event:Event) => {
                    events.push(event);
                })
            });

            events.forEach((event:Event) => {
                var promises:Array<any> = [];
                if (event.deleted) {
                    promises.push(new Promise((resolve, reject) => {
                        instance.removeItem(event.eventId.toString()).then(() => {
                            resolve();
                        });
                    }));

                } else {
                    promises.push(new Promise((resolve, reject) => {
                        event.event_type = eventType;

                        instance.getItem(event.eventId.toString()).then((item:Event) => {

                            event.isFavorite = false;
                            if (item) {
                                event.isFavorite = item.isFavorite;
                            }

                            instance.setItem(event.eventId.toString(), event).then(() => {
                                resolve();
                            });
                        });
                    }));
                }

                Promise.all(promises).then(() => {
                    this.dataChanged$.emit(entityName);
                })
            });
        });
    }

    grabData(api:string, entityName:string, itemId:string, responseItem:string = null, since:string = '') {
        if (!responseItem) {
            responseItem = entityName;
        }

        var instance = this._localforage.createInstance({
            name: entityName
        });

        this._loadService(api, since).then(response => {
            if (response && response[responseItem]) {

                var promises:any[] = [];
                response[responseItem].forEach((item:any) => {
                    promises.push(new Promise((resolve, reject) => {
                        if (item.deleted) {
                            instance.removeItem(item[itemId].toString()).then(() => {
                                resolve();
                            });
                        } else {
                            instance.setItem(item[itemId].toString(), item).then(() => {
                                resolve();
                            });
                        }
                    }));
                });

                Promise.all(promises).then(() => {
                    this.dataChanged$.emit(entityName);
                });
            }
        })
    }

    private _collectionsPromises:any = {};

    getCollection(name:string) {
        if (typeof this._collectionsPromises[name] !== 'undefined') {
            return this._collectionsPromises[name];
        }

        console.log('I am here', name);
        var instance = this._localforage.createInstance({
            name: name
        });

        return this._collectionsPromises[name] = new Promise((resolve, reject) => {

            instance.keys().then((keys:string[]) => {
                var promises:any[] = [];
                keys.forEach(key => {
                    promises.push(instance.getItem(key))
                })

                Promise.all(promises).then((collection:any) => {
                    resolve(collection);
                })
            });
        })
    }

    private _loadService(service:string, since:string) {
        var headers = new Headers();
        if (since) {
            headers.append('If-Modified-Since', since);
        }

        var observer = this._http.get(this._config.apiUrl + service, {
            headers: headers
        }).map(response => {
            if (service == 'checkUpdates') {
                var instance = this._localforage.createInstance({name: 'updates'});
                instance.setItem('lastUpdate', response.headers.get('Last-Modified'));
            }

            return response.json()
        }).catch(error => {
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
