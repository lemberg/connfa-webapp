import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Location} from "../models/locations";

@Injectable()

export class LocationService {

    constructor(private _apiService: ApiService) {}

    locations:Location[];

    getLocations() {
        return this._apiService.getCollection('locations');
    }
}
