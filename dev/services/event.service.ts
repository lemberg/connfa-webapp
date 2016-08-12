import {Injectable, Inject, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Event} from "../models/event";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";
import {Speaker} from "../models/speaker";
import moment from 'moment';
import {Router} from "@angular/router";


@Injectable()

export class EventService {

    public events = [];

    public formattedEvents = [];
    public activeDate;
    public dates;
    public activeEvents;
    public eventsChanged$;
    public type = null;

    private _nonClickableTypes = [3, 4, 8, 9];
    private _localforage;
    private _favoriteEvents = [];
    private _routes = {
        session: '/sessions/',
        bof: '/bofs/',
        social: '/socialevents/',
    }
    private _eventsPromise = {
        session: null,
        bof: null,
        social: null,
    };

    constructor(private _apiService:ApiService,
                private _speakerService:SpeakerService,
                private _levelService:LevelService,
                private _trackService:TrackService,
                private _router:Router,
                @Inject('localforage') localforage) {

        this.eventsChanged$ = new EventEmitter();
        this._localforage = localforage;

        this._apiService.dataChanged$.subscribe(data => {
            if (this.type != null) {
                this._eventsPromise[this.type] = null;
                this.events[this.type] = [];
                this.getEventsByType(this.type).then(data => {
                    this.eventsChanged$.emit(data);
                });
            }
        });
    }

    public getEventsByType(type) {
        this.type = type;
        if (this._eventsPromise[type] !== null) {
            return this._eventsPromise[type];
        }

        if (!this.events[type] || !this.events[type].length) {
            var filterInstance = this._localforage.createInstance({
                name: 'filters'
            });

            return this._eventsPromise[type] = filterInstance.getItem('filters').then(filters => {

                return this._apiService.getCollection('events').then((events:Event[])=> {
                    events = this._transform(events);
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

                    var filteredEvents = [];

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

    public setActiveDate(date, redirect = false) {
        this.activeDate = date;
        this.activeEvents = this.formattedEvents[this.activeDate];
        if (redirect) {
            var event = this._getFirstActiveEvent(this.activeEvents);
            this._router.navigate([this._routes[event.event_type] + event.eventId]);
        }
        this.eventsChanged$.emit(date);
    }

    public getEvent(id, type) {

        return this.getEventsByType(type).then((events:Event[]) => {
            var event = events.find(item => {
                return item.eventId == id;
            });
            return event;
        })
    }

    public toggleFavorite(event, type) {
        var storage = this._localforage.createInstance({
            name: 'events'
        });

        storage.getItem(event.eventId.toString()).then(item => {
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

    public isFavorite(event) {
        if (this._favoriteEvents.indexOf(event.eventId.toString()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    public filterEvents(levels, tracks, type) {
        this.getEventsByType(type).then(events => {

            var promise = new Promise((resolve, reject) => {
                var filteredEvents = [];
                this.events[type].forEach(event => {
                    if (this._inLevels(event, levels) && this._inTracks(event, tracks)) {
                        filteredEvents.push(event);
                    }
                });
                resolve(filteredEvents);
            })

            promise.then(events => {
                this.transformEvents(events).then(data => {
                    this._bindChanges(data, true);
                    this.eventsChanged$.emit('changed');
                })
            })
        });
    }

    public isNonClickable(type) {
        return this._nonClickableTypes.indexOf(type) !== -1
    }

    private _getFirstActiveEvent(activeEvents) {
        var firstHour = Object.keys(activeEvents)[0];
        var event = this.activeEvents[firstHour][0];

        return event;
    }

    private _bindChanges(data, changeActiveDate = false) {
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

    private _inLevels(session, levels) {
        var levelId = session.experienceLevel;
        if (!Object.keys(levels).length) {
            return true;
        }

        if (levels && levels[levelId] == true) {
            return true;
        } else {
            return false;
        }
    }

    private _inTracks(session, tracks) {
        var trackId = session.track;
        if (!Object.keys(tracks).length) {
            return true;
        }
        if (tracks && tracks[trackId] == true) {
            return true;
        } else {

            return false;
        }
    }

    private _transform(item) {

        if (item.experienceLevel) {
            this._levelService.getLevel(item.experienceLevel).then(level => {
                item.levelObject = level;
            })
        }

        if (item.track) {
            this._trackService.getTrack(item.track).then(track => {
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

    private transformEvents(events) {
        var transformed = [];
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

    private getDates(data) {
        return Object.keys(data);
    }

    private filterByType(type, event) {
        return event.event_type == type;
    }
}
