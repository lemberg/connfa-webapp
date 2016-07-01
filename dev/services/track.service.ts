import {Injectable, Inject} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()

export class TrackService {

    constructor(private _apiService: ApiService) {}

    tracks

    getTracks() {

        if (!this.tracks || this.tracks.length == 0) {
            return this._apiService.getCollection('tracks').then((tracks)=> {
                this.tracks = this.sortTracks(tracks);
                return tracks;
            });
        } else {
            return Promise.resolve(this.tracks)
        }
    }


    getTrack(id) {
        return new Promise((resolve, reject) => {
            this.getTracks().then((tracks) => {
                tracks.forEach(item => {
                    if (item.trackId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private sortTracks(tracks) {
        return tracks.sort((a, b) => {
            a.order > b.order;
        });
    }
}
