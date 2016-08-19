import {ApiService} from "./api.service";
import {Floor} from "../models/floors";
import {Injectable, EventEmitter} from "@angular/core";

@Injectable()

export class FloorService {

    public floorsChanged$:EventEmitter<any>;
    public floors:Floor[];

    constructor(private _apiService: ApiService) {

        this.floorsChanged$ = new EventEmitter();

        this._apiService.dataChanged$.subscribe((data:Floor[]) => {
            this.floors = [];
            this.getFloors().then((floors) => {
                this.floorsChanged$.emit(floors);
            });
        })
    }

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
