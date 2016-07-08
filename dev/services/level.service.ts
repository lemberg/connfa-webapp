import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()

export class LevelService {

    constructor(private _apiService: ApiService) {}

    levels

    getLevels() {

        if (!this.levels || this.levels.length == 0) {
            return this._apiService.getCollection('levels').then((levels)=> {
                this.levels = this.sortLevels(levels);
                return levels;
            });
        } else {
            return Promise.resolve(this.levels)
        }
    }


    getLevel(id) {
        return new Promise((resolve, reject) => {
            this.getLevels().then((levels) => {
                levels.forEach(item => {
                    if (item.levelId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private sortLevels(levels) {
        return levels.sort((a, b) => {
            a.order > b.order;
        });
    }
}
