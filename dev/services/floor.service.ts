import {ApiService} from "./api.service";
import {Floor} from "../models/floors";
import {Injectable} from "@angular/core";

@Injectable()

export class FloorService {

    constructor(private _apiService: ApiService) {}

    floors:Floor[];

    getFloors() {
        return this._apiService.getCollection('floors');
    }
}
