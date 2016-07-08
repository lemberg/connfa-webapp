import {Injectable, Inject} from "@angular/core";
import {ApiService} from "./api.service";
import {Event} from "../models/event";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";

declare var moment:any;

@Injectable()

export class EventService {

    public events = [];
    public sessions = [];
    public bofs = [];
    public social = [];

    private _localforage;
    private favoriteEvents;
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

        this._localforage = localforage;
        this._localforage.createInstance({
            name: 'events_favorite'
        }).keys().then(keys => {
            this.favoriteEvents = keys;
        });
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

                        if (first < second) {
                            return -1;
                        } else if (first > second) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                this.events[type] = eventsOfType;
                return eventsOfType;
            });

        } else {
            return Promise.resolve(this.events[type]);
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

    toggleFavorite(event, type) {
        var storage = this._localforage.createInstance({
            name: 'events_favorite'
        });

        if (event.isFavorite) {
            event.event_type = type;
            this.favoriteEvents.push(event.eventId.toString());
            storage.setItem(event.eventId.toString(), event);
        } else {
            this.favoriteEvents.splice(this.favoriteEvents.indexOf(event.eventId.toString()), 1);
            storage.removeItem(event.eventId.toString());
        }
    }

    isFavorite(event) {
        if (this.favoriteEvents.indexOf(event.eventId.toString()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    private transform(events) {
        var transformed = [];
        events.forEach(item => {
            item.isFavorite = this.isFavorite(item);

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
                    this._speakerService.getSpeaker(speakerId).then(speaker => {
                        item.speakersCollection.push(speaker);
                        item.speakersNames.push(speaker.firstName+' '+speaker.lastName)
                    })
                })
            }
            transformed.push(item);
        });
        return transformed;
    }

    private filterByType(type, event) {
        return event.event_type == type;
    }
}
