import {Injectable} from "angular2/core";
import {ApiService} from "./api.service";
import {Floor} from "../models/floors";

@Injectable()

export class FloorService {

    constructor(private _apiService: ApiService) {}

    floors:Floor[];

    getFloors() {
        return this._apiService.getCollection('floors');
    }
}
