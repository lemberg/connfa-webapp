import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Speaker} from "../models/speaker";
import {SPEAKERS} from "../models/mock-speakers";

@Injectable()

export class SpeakerService {

    private _config;

    constructor(private _http:Http, @Inject('config') config) {
        this._config = config;
    }

    speakers:Speaker[]

    getSpeakers() {
        if (!this.speakers || this.speakers.length == 0) {
            return this.loadSpeakers().then((speakers: Speaker[])=> {
                this.speakers = this.sortSpeakers(speakers);
                return speakers;
            });
        } else {
            console.log('Cached');
            return Promise.resolve(this.speakers)
        }
    }

    loadSpeakers() {
        var observer = this._http.get(this._config.apiUrl+'getSpeakers')
            .map(response => response.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error.json());
            });

        return new Promise((resolve, reject)  => {
            observer.subscribe(function (res) {
                resolve(res.speakers);
            });
        })

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
