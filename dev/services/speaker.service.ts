import {Injectable, EventEmitter, Inject} from "@angular/core";
import {Speaker} from "../models/speaker";
import {ApiService} from "./api.service";
import {SpeakersEventsService} from "./speakers_events.service";
import {Event} from "../models/event";

@Injectable()

export class SpeakerService {

    public speakers;
    public speakersChanged$:EventEmitter<Speaker[]>;

    private _localforage;

    constructor(private _apiService:ApiService,
                @Inject('localforage') localforage,
                private _speakersEventsService:SpeakersEventsService) {

        this.speakers = this.getSpeakers();
        this.speakersChanged$ = new EventEmitter();
        this._localforage = localforage;
    }

    getSpeakers() {

        if (!this.speakers || this.speakers.length == 0) {
            return this._apiService.getCollection('speakers').then((speakers:Speaker[])=> {
                this.speakers = this.sortSpeakers(speakers);
                return speakers;
            });
        } else {
            return Promise.resolve(this.speakers)
        }
    }

    getSpeaker(id) {
        return new Promise((resolve, reject) => {
            this.getSpeakers().then((speakers:Speaker[]) => {
                speakers.forEach(item => {
                    if (item.speakerId == id) {
                        item.events = [];
                        this._apiService.getCollection('events').then((events: Event[]) => {
                            events = events.filter(this.getSpeakerEvents.bind(event, item.speakerId))
                                .sort((a, b) => {
                                    if (a.order > b.order) {
                                        return -1;
                                    } else if (a.order < b.order) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                });
                            events.forEach(event => {
                                this._speakersEventsService.getEvent(event.eventId, event.event_type).then(event => {
                                    item.events.push(event);
                                })
                            })
                        });

                        resolve(item);
                    }
                })
            });
        })
    }

    private getSpeakerEvents(speakerId, event) {
        if (event.speakers.indexOf(speakerId) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    search(value:string) {
        var filteredSpeakers = this.speakers.filter(this.filterSpeakers.bind(this, value));
        this.speakersChanged$.emit(filteredSpeakers);
    }

    private filterSpeakers(value, item) {
        if (item.firstName.toLocaleLowerCase().startsWith(value.toLowerCase()) ||
            item.lastName.toLowerCase().startsWith(value.toLowerCase())) {

            return true;
        }
    }

    private sortSpeakers(speakers) {
        // speakers
        return speakers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
}
