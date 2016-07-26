import {ApiService} from "./api.service";
import {Floor} from "../models/floors";
import {Injectable} from "@angular/core";

@Injectable()

export class FloorService {

    constructor(private _apiService: ApiService) {}

    floors:Floor[];

    getFloors() {
        if (!this.floors || !this.floors.length) {

            return new Promise((resolve, reject) => {
                this._apiService.getCollection('floors').then((floors: Floor[]) => {
                    floors.sort((a, b) => {
                        if (a.order < b.order) {
                            return -1;
                        } else if (a.order > b.order) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    this.floors = floors;
                    resolve(floors);
                })
            });
        } else {
            return Promise.resolve(this.floors);
        }
    }
}
