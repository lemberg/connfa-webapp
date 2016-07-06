import {Component} from "@angular/core";
import {TrackService} from "../../services/track.service";
import {Track} from "../../models/track";
import {Level} from "../../models/level";
import {LevelService} from "../../services/level.service";
import {FilterService} from "../../services/filter.service";

@Component({
    selector: 'events-filter',
    templateUrl: 'app/views/events_partials/filter.html',
    providers: [FilterService],
    inputs: ['eventsType']
})

export class FilterComponent {

    public tracks:Track[];
    public levels:Level[];
    public tracksSelected = [];
    public levelsSelected = [];
    public isCheckedAll = false;
    public eventsType;

    public constructor(private _tracksService:TrackService,
                       private _levelService:LevelService,
                       private _filterService:FilterService) {
        this._tracksService.getTracks().then((tracks:Track[]) => {
            this.tracks = tracks;
        })

        this._levelService.getLevels().then((levels:Level[]) => {
            this.levels = levels;
        })
    }

    public toggleAll() {
        // if (this.isCheckedAll) {
        this.tracksSelected = [];
        this.levelsSelected = [];
        // }

        this.isCheckedAll = !this.isCheckedAll;
        this.onSubmit();
    }

    public onSubmit() {
        this.levelsSelected.forEach((level, index) => {
            if (level == false) {
                delete this.levelsSelected[index];
            }
        })
        this.tracksSelected.forEach((track, index) => {
            if (track == false) {
                delete this.tracksSelected[index];
            }
        })
        this._filterService.filterEvents(this.levelsSelected, this.tracksSelected, this.eventsType);
    }

}
