import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Event} from "../models/event";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {TrackService} from "./track.service";

declare var moment:any;
@Injectable()

export class EventService {

    constructor(private _apiService:ApiService,
                private _speakerService:SpeakerService,
                private _levelService:LevelService,
                private _trackService:TrackService) {
    }

    events = [];

    getEventsByType(type) {
        if (!this.events[type]) {
            return this._apiService.getCollection('events').then((events:Event[])=> {
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
                            item.speakers.forEach((speakerId) => {
                                this._speakerService.getSpeaker(speakerId).then(speaker => {
                                    item.speakersCollection.push(speaker);
                                })
                            })
                        }
                        resolve(item);
                    }
                })
            });
        })
    }

    private filterByType(type, event) {
        return event.event_type == type;
    }
}
