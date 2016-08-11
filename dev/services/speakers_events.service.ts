import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";
import {Event} from "../models/event";
import {Track} from "../models/track";
import {Level} from "../models/level";
import moment from 'moment';

@Injectable()

export class SpeakersEventsService {

    public events = [];
    private _eventsPromise = {
        session: null,
        bof: null,
        social: null,
    };

    public constructor(private _apiService:ApiService,
                       private _levelService:LevelService,
                       private _trackService:TrackService) {
    }


    public getEventsByType(type) {
        if (this._eventsPromise[type] !== null) {
            return this._eventsPromise[type];
        }

        if (!this.events[type] || !this.events[type].length) {
            return this._eventsPromise[type] = this._apiService.getCollection('events').then((events:Event[])=> {
                var eventsOfType = events
                    .filter(this.filterByType.bind(this, type))
                    .sort((a, b) => {
                        var first = moment(a.from, moment.ISO_8601).format('x');
                        var second = moment(b.from, moment.ISO_8601).format('x');

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
            this.getEventsByType(type).then((events:Event[]) => {

                var event = events.find((item:Event)=> {
                    return item.eventId == id;
                });

                event.timeLabel = moment(event.from, moment.ISO_8601).format('ddd, LT') + ' - ' + moment(event.to, moment.ISO_8601).format('ddd, LT');

                if (event.experienceLevel) {
                    this._levelService.getLevel(event.experienceLevel).then((level: Level) => {
                        event.levelObject = level;
                    })
                }

                if (event.track) {
                    this._trackService.getTrack(event.track).then((track: Track) => {
                        event.trackObject = track;
                    })
                }

                resolve(event);
            });
        });
    }

    private filterByType(type, event) {
        return event.event_type == type;
    }
}
