import {Injectable, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Level} from "../models/level";

@Injectable()

export class LevelService {

    public levels:Level[];

    private _levelsPromise:Promise<Level[]> = null;
    public levelsChanged$:EventEmitter<any>;

    constructor(private _apiService:ApiService) {

        this.levelsChanged$ = new EventEmitter();

        this._apiService.dataChanged$.subscribe((data:Level[]) => {
            this.levels = [];
            this._levelsPromise = null;
            this.getLevels().then((levels:Level[]) => {
                this.levelsChanged$.emit(levels);
            });
        });
    }

    getLevels() {
        if (this._levelsPromise != null) {
            return this._levelsPromise;
        }

        if (!this.levels || this.levels.length == 0) {
            return this._levelsPromise = this._apiService.getCollection('levels').then((levels:Level[])=> {
                this.levels = this.sortLevels(levels);
                return levels;
            });
        } else {
            return Promise.resolve(this.levels)
        }
    }


    getLevel(id:number) {
        return this.getLevels().then((levels:Level[]) => {
            return levels.find((item:Level) => {
                return item.levelId == id
            })
        });
    }

    private sortLevels(levels:Level[]) {
        return levels.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            } else if (a.order < b.order) {
                return -1;
            } else {
                return 0;
            }
        });
    }
}
