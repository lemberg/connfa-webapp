import {Injectable, EventEmitter, Inject} from "@angular/core";
import {Speaker} from "../models/speaker";
import {ApiService} from "./api.service";
import {SpeakersEventsService} from "./speakers_events.service";
import {Event} from "../models/event";

@Injectable()

export class SpeakerService {

    public speakers:Speaker[];
    public speakersChanged$:EventEmitter<any>;

    private _localforage:any;
    private _speakersPromise:Promise<Speaker[]> = null;

    constructor(private _apiService:ApiService,
                private _speakersEventsService:SpeakersEventsService,
                @Inject('localforage') localforage:any) {

        this.speakersChanged$ = new EventEmitter();
        this._localforage = localforage;

        this._apiService.dataChanged$.subscribe((data:any) => {
            this.speakers = [];
            this._speakersPromise = null;
            this.getSpeakers().then((speakers:Speaker[]) => {
                this.speakersChanged$.emit(speakers);
            });
        });
    }

    public getSpeakers():Promise<Speaker[]> {

        if (this._speakersPromise !== null) {
            return this._speakersPromise;
        }

        if (!this.speakers || this.speakers.length == 0) {
            return this._speakersPromise = this._apiService.getCollection('speakers').then((speakers:Speaker[])=> {
                this.speakers = this.sortSpeakers(speakers);
                return speakers;
            });
        } else {
            return Promise.resolve(this.speakers)
        }
    }

    public getSpeaker(id:number):Promise<Speaker> {
        return new Promise((resolve, reject) => {
            this.getSpeakers().then((speakers:Speaker[]) => {
                var speaker = speakers.find((speaker:Speaker) => {
                    return speaker.speakerId == id;
                });

                speaker.events = [];
                this._apiService.getCollection('events').then((events:Event[]) => {
                    events = events.filter(this.getSpeakerEvents.bind(event, speaker.speakerId))
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
                        this._speakersEventsService.getEvent(event.eventId, event.event_type).then((event:Event) => {
                            speaker.events.push(event);
                        })
                    })
                });

                resolve(speaker);

            });
        })
    }

    public search(value:string) {
        var filteredSpeakers = this.speakers.filter(this.filterSpeakers.bind(this, value));
        this.speakersChanged$.emit(filteredSpeakers);
    }

    private getSpeakerEvents(speakerId:number, event:Event) {
        if (event.speakers.indexOf(speakerId) !== -1) {
            return true;
        } else {
            return false;
        }
    }


    private filterSpeakers(value:string, item:Speaker) {
        if (item.firstName.toLocaleLowerCase().startsWith(value.toLowerCase()) ||
            item.lastName.toLowerCase().startsWith(value.toLowerCase())) {

            return true;
        }
    }

    private sortSpeakers(speakers:Speaker[]) {
        return speakers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
}
