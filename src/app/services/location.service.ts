import {Injectable, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Location} from "../models/locations";

@Injectable()

export class LocationService {

    public locationsChanged$:EventEmitter<any>;

    constructor(private _apiService: ApiService) {
        this.locationsChanged$ =  new EventEmitter();

        this._apiService.dataChanged$.subscribe((data:Location[]) => {
            this.locations = [];
            this.getLocations().then((locations:any) => {
                this.locationsChanged$.emit(locations);
            });
        })
    }

    locations:Location[];

    getLocations() {
        return this._apiService.getCollection('locations');
    }
}
