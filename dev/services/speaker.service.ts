import {Injectable, Inject} from "@angular/core";
import {Speaker} from "../models/speaker";
import {ApiService} from "./api.service";

@Injectable()

export class SpeakerService {

    constructor(private _apiService: ApiService) {}

    speakers:Speaker[]

    getSpeakers() {

        if (!this.speakers || this.speakers.length == 0) {
            return this._apiService.getCollection('speakers').then((speakers: Speaker[])=> {
                this.speakers = this.sortSpeakers(speakers);
                return speakers;
            });
        } else {
            return Promise.resolve(this.speakers)
        }
    }

    getSpeaker(id) {
        return new Promise((resolve, reject) => {
            this.getSpeakers().then((speakers: Speaker[]) => {
                speakers.forEach(item => {
                    if (item.speakerId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private sortSpeakers(speakers) {
        // speakers
        return speakers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
}
