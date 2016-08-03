import {Injectable, Inject} from "@angular/core";
import {ApiService} from "./api.service";
import {Track} from "../models/track";

@Injectable()

export class TrackService {

    constructor(private _apiService: ApiService) {}

    public tracks;

    private _tracksPromise: Promise<Track[]> = null;

    public getTracks() {
        if (this._tracksPromise !== null) {
            return this._tracksPromise;
        }

        if (!this.tracks || this.tracks.length == 0) {
            return this._tracksPromise = this._apiService.getCollection('tracks').then((tracks: Track[])=> {
                this.tracks = this._sortTracks(tracks);
                return tracks;
            });
        } else {
            return Promise.resolve(this.tracks)
        }
    }


    public getTrack(id) {
        return new Promise((resolve, reject) => {
            this.getTracks().then((tracks: Track[]) => {
                tracks.forEach(item => {
                    if (item.trackId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private _sortTracks(tracks) {
        return tracks.sort((a, b) => {
            a.order > b.order;
        });
    }
}
