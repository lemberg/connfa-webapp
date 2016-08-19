import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {Event} from "../models/event";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";
import {Speaker} from "../models/speaker";
import {WindowService} from "./window.service";
import * as moment from 'moment';
import {Level} from "../models/level";
import {Track} from "../models/track";


@Injectable()

export class EventService {

    public events:Event[] = [];

    public formattedEvents:any = [];
    public activeDate:string;
    public dates:string[];
    public activeEvents:any;
    public eventsChanged$:EventEmitter<any>;
    public type:string = null;

    private _nonClickableTypes:number[] = [3, 4, 8, 9];
    private _localforage:any;
    private _favoriteEvents:any[] = [];
    private _routes:any = {
        session: '/sessions/',
        bof: '/bofs/',
        social: '/socialevents/',
    }
    private _eventsPromise:any = {
        session: null,
        bof: null,
        social: null,
    };

    constructor(private _apiService:ApiService,
                private _speakerService:SpeakerService,
                private _levelService:LevelService,
                private _trackService:TrackService,
                private _windowService:WindowService,
                private _router:Router,
                @Inject('localforage') localforage:any) {

        this.eventsChanged$ = new EventEmitter();
        this._localforage = localforage;

        this._apiService.dataChanged$.subscribe((data:any) => {
            if (this.type != null) {
                this._eventsPromise[this.type] = null;
                this.events[this.type] = [];
                this.getEventsByType(this.type).then((data:any) => {
                    this.eventsChanged$.emit(data);
                });
            }
        });
    }

    public getEventsByType(type:string) {
        this.type = type;
        if (this._eventsPromise[type] !== null) {
            return this._eventsPromise[type];
        }

        if (!this.events[type] || !this.events[type].length) {
            var filterInstance = this._localforage.createInstance({
                name: 'filters'
            });

            return this._eventsPromise[type] = filterInstance.getItem('filters').then((filters:any) => {

                return this._apiService.getCollection('events').then((events:Event[])=> {
                    var eventsOfType = events
                        .filter(this.filterByType.bind(this, type))
                        .sort((a, b) => {
                            var first = moment(a.from, moment.ISO_8601).format('x');
                            var second = moment(b.from, moment.ISO_8601).format('x');

                            if (first == second) {
                                if (a.order > b.order) {
                                    return 1;
                                } else if (a.order < b.order) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }

                            if (first < second) {
                                return -1;
                            } else if (first > second) {
                                return 1;
                            }
                        });

                    var filteredEvents:any = [];

                    if (!filters) {
                        filteredEvents = eventsOfType;
                    } else {
                        eventsOfType.forEach((event) => {
                            if (this._inLevels(event, filters.levels) && this._inTracks(event, filters.tracks)) {
                                filteredEvents.push(event);
                            }
                        })
                    }

                    this.transformEvents(filteredEvents).then((events) => {
                        this._bindChanges(events);
                    })

                    this.events[type] = eventsOfType;
                    return eventsOfType;
                });
            });

        } else {
            return Promise.resolve(this.events[type]);
        }

    }

    public setActiveDate(date:string, redirect:boolean = false) {
        this.activeDate = date;
        this.activeEvents = this.formattedEvents[this.activeDate];
        if (redirect && this._windowService.isDesktop()) {
            var event = this._getFirstActiveEvent(this.activeEvents);
            this._router.navigate([this._routes[event.event_type] + event.eventId]);
        }
        this.eventsChanged$.emit(date);
    }

    public getEvent(id:number, type:string) {

        return this.getEventsByType(type).then((events:Event[]) => {
            var event = events.find(item => {
                return item.eventId == id;
            });
            return event;
        })
    }

    public toggleFavorite(event:Event, type:string) {
        var storage = this._localforage.createInstance({
            name: 'events'
        });

        storage.getItem(event.eventId.toString()).then((item:Event)=> {
            item.isFavorite = event.isFavorite;
            storage.setItem(event.eventId.toString(), item);
        });

        if (event.isFavorite) {
            event.event_type = type;
            this._favoriteEvents.push(event.eventId.toString());
        } else {
            this._favoriteEvents.splice(this._favoriteEvents.indexOf(event.eventId.toString()), 1);
        }
    }

    public isFavorite(event:Event) {
        if (this._favoriteEvents.indexOf(event.eventId.toString()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    public filterEvents(levels:Level[], tracks:Track[], type:string) {
        this.getEventsByType(type).then((events:Event[]) => {

            var promise = new Promise((resolve, reject) => {
                var filteredEvents:any = [];
                this.events[type].forEach((event:Event) => {
                    if (this._inLevels(event, levels) && this._inTracks(event, tracks)) {
                        filteredEvents.push(event);
                    }
                });
                resolve(filteredEvents);
            })

            promise.then((events:Event[]) => {
                this.transformEvents(events).then(data => {
                    this._bindChanges(data, true);
                    this.eventsChanged$.emit('changed');
                })
            })
        });
    }

    public isNonClickable(type:number) {
        return this._nonClickableTypes.indexOf(type) !== -1
    }

    private _getFirstActiveEvent(activeEvents:any) {
        var firstHour = Object.keys(activeEvents)[0];
        var event = this.activeEvents[firstHour][0];

        return event;
    }

    private _bindChanges(data:any, changeActiveDate:boolean = false) {
        this.formattedEvents = data;
        this.dates = this.getDates(data);
        if (this.dates.length) {
            this.activeDate = this.activeDate || this.dates[0];
            if (changeActiveDate) {
                this.activeDate = this.dates[0];
            }

            this.activeEvents = this.formattedEvents ? this.formattedEvents[this.activeDate] : null;
        } else {
            this.dates = [];
            this.activeEvents = [];
        }
    }

    private _inLevels(event:Event, levels:any) {
        var levelId = event.experienceLevel;
        if (!Object.keys(levels).length) {
            return true;
        }

        if (levels && levels[levelId] == true) {
            return true;
        } else {
            return false;
        }
    }

    private _inTracks(event:Event, tracks:any) {
        var trackId = event.track;
        if (!Object.keys(tracks).length) {
            return true;
        }
        if (tracks && tracks[trackId] == true) {
            return true;
        } else {

            return false;
        }
    }

    private _transform(item:Event) {

        if (item.experienceLevel) {
            this._levelService.getLevel(item.experienceLevel).then((level:Level) => {
                item.levelObject = level;
            })
        }

        if (item.track) {
            this._trackService.getTrack(item.track).then((track:Track) => {
                item.trackObject = track;
            })
        }

        item.href = false;
        if (!this.isNonClickable(item.type)) {
            item.href = this._routes[item.event_type] + item.eventId;
        }

        if (item.speakers) {
            item.speakersCollection = [];
            item.speakersNames = [];
            item.speakers.forEach((speakerId) => {
                this._speakerService.getSpeaker(speakerId).then((speaker:Speaker) => {
                    item.speakersCollection.push(speaker);
                    item.speakersNames.push(speaker.firstName + ' ' + speaker.lastName)
                })
            })
        }
        item.timeLabel = moment(item.from, moment.ISO_8601).format('ddd, LT') + ' - ' + moment(item.to, moment.ISO_8601).format('ddd, LT');
        item.fromLabel = moment(item.from, moment.ISO_8601).format('LT');
        item.toLabel = moment(item.to, moment.ISO_8601).format('LT');
        if (item.isFavorite) {
            this._favoriteEvents.push(item.eventId);
        }

        return item;
    }

    private transformEvents(events:Event[]) {
        var transformed:any = [];
        return new Promise((resolve, reject) => {
            events.forEach((event:Event) => {
                var event_day = moment(event.from, moment.ISO_8601).format('ddd D');
                var event_hours = moment(event.from, moment.ISO_8601).format('LT') + ' ' + moment(event.to, moment.ISO_8601).format('LT');

                if (!transformed[event_day]) {
                    transformed[event_day] = [];
                }

                if (!transformed[event_day][event_hours]) {
                    transformed[event_day][event_hours] = [];
                }

                transformed[event_day][event_hours].push(this._transform(event));
            });

            return resolve(transformed);
        });
    }

    private getDates(data:any) {
        return Object.keys(data);
    }

    private filterByType(type:string, event:Event) {
        return event.event_type == type;
    }
}
