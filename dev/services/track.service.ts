import {Injectable, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Track} from "../models/track";

@Injectable()

export class TrackService {

    public tracks;
    public tracksChanged$:EventEmitter<any>;

    private _tracksPromise: Promise<Track[]> = null;

    constructor(private _apiService: ApiService) {
        this.tracksChanged$ = new EventEmitter();

        this._apiService.dataChanged$.subscribe(data => {
            this.tracks = [];
            this._tracksPromise = null;
            this.getTracks().then((tracks:Track[]) => {
                this.tracksChanged$.emit(tracks);
            });
        });
    }

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
