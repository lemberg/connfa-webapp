import {Injectable, Inject, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Event} from "../models/event";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";
import {Speaker} from "../models/speaker";


declare var moment:any;

@Injectable()

export class EventService {

    public events = [];

    public formattedEvents = [];
    public activeDate;
    public dates;
    public activeEvents;
    public eventsChanged$;

    private _localforage;
    private favoriteEvents = [];
    private eventsPromise = {
        session: null,
        bof: null,
        social: null,
    };

    constructor(private _apiService:ApiService,
                private _speakerService:SpeakerService,
                private _levelService:LevelService,
                private _trackService:TrackService,
                @Inject('localforage') localforage) {

        this.eventsChanged$ = new EventEmitter();
        this._localforage = localforage;
    }

    getEventsByType(type) {
        if (this.eventsPromise[type] !== null) {
            return this.eventsPromise[type];
        }

        if (!this.events[type]) {
            return this.eventsPromise[type] = this._apiService.getCollection('events').then((events:Event[])=> {
                events = this.transform(events);
                var eventsOfType = events
                    .filter(this.filterByType.bind(this, type))
                    .sort((a, b) => {
                        var first = moment(a.from).format('x');
                        var second = moment(b.from).format('x');

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

                this.transformEvents(eventsOfType).then((events) => {
                    this.bindChanges(events);
                })

                this.events[type] = eventsOfType;
                return eventsOfType;
            });

        } else {
            return Promise.resolve(this.events[type]);
        }

    }

    public setActiveDate(date) {
        this.activeDate = date;
        this.activeEvents = this.formattedEvents[this.activeDate];
        this.eventsChanged$.emit(date);
    }

    private bindChanges(data, changeActiveDate = false) {
        console.log(data);
        this.formattedEvents = data;
        this.dates = this.getDates(data);
        if (this.dates.length) {
            console.log('in dates');
            this.activeDate = this.activeDate || this.dates[0];
            if (changeActiveDate) {
                this.activeDate = this.dates[0];
            }

            this.activeEvents = this.formattedEvents ? this.formattedEvents[this.activeDate] : null;
        } else {
            console.log('no dates');
            this.dates = [];
            this.activeEvents = [];
        }
    }

    getEvent(id, type) {
        return new Promise((resolve, reject) => {
            this.getEventsByType(type).then((events) => {
                events.forEach(item => {
                    if (item.eventId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private inLevels(session, levels) {
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

    private inTracks(session, tracks) {
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

    toggleFavorite(event, type) {
        var storage = this._localforage.createInstance({
            name: 'events'
        });

        storage.getItem(event.eventId.toString()).then(item => {
            item.isFavorite = event.isFavorite;
            storage.setItem(event.eventId.toString(), item);
        });

        if (event.isFavorite) {
            event.event_type = type;
            this.favoriteEvents.push(event.eventId.toString());
        } else {
            this.favoriteEvents.splice(this.favoriteEvents.indexOf(event.eventId.toString()), 1);
        }
    }

    public filterEvents(levels, tracks, type) {
        this.getEventsByType(type).then(events => {

            var promise = new Promise((resolve, reject) => {
                var filteredEvents = [];
                this.events[type].forEach(event => {
                    if (this.inLevels(event, levels) && this.inTracks(event, tracks)) {
                        filteredEvents.push(event);
                    }
                });
                resolve(filteredEvents);
            })

            promise.then(events => {
                this.transformEvents(events).then(data => {
                    this.bindChanges(data, true);
                    this.eventsChanged$.emit('changed');
                })
            })
        });
    }

    isFavorite(event) {
        if (this.favoriteEvents.indexOf(event.eventId.toString()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    private transform(item) {

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

        item.fromLabel = moment(item.from).format('LT');
        item.toLabel = moment(item.to).format('LT');
        if (item.isFavorite) {
            this.favoriteEvents.push(item.eventId);
        }

        return item;
    }

    private transformEvents(events) {
        var transformed = [];
        return new Promise((resolve, reject) => {
            events.forEach((event:Event) => {
                var event_day = moment(event.from).format('ddd D');
                var event_hours = moment(event.from).format('LT') + ' ' + moment(event.to).format('LT');

                if (!transformed[event_day]) {
                    transformed[event_day] = [];
                }

                if (!transformed[event_day][event_hours]) {
                    transformed[event_day][event_hours] = [];
                }

                transformed[event_day][event_hours].push(this.transform(event));
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
