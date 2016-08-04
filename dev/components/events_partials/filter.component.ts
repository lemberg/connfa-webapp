import {Component, OnInit} from "@angular/core";
import {TrackService} from "../../services/track.service";
import {Track} from "../../models/track";
import {Level} from "../../models/level";
import {LevelService} from "../../services/level.service";
import {FilterService} from "../../services/filter.service";

declare var jQuery: any;

@Component({
    selector: 'events-filter',
    templateUrl: 'app/views/events_partials/filter.html',
    providers: [FilterService],
    inputs: ['eventsType']
})

export class FilterComponent implements OnInit{

    public tracks:Track[];
    public levels:Level[];
    public tracksSelected = [];
    public levelsSelected = [];
    public isCheckedAll = false;
    public eventsType;

    public constructor(private _tracksService:TrackService,
                       private _levelService:LevelService,
                       private _filterService:FilterService) {
    }

    ngOnInit():any {

        this._tracksService.getTracks().then((tracks:Track[]) => {
            this.tracks = tracks;
        })

        this._levelService.getLevels().then((levels:Level[]) => {
            this.levels = levels;
        })

        this._levelService.levelsChanged$.subscribe((levels:Level[]) => {
            this.levels = levels;
        })

        this._tracksService.tracksChanged$.subscribe((tracks:Track[]) => {
            this.tracks = tracks;
        })

        this._filterService.getFilters(this.eventsType).then(filters => {
            if (filters && filters.levels) {
                this.levelsSelected = filters.levels;
            }
            if (filters && filters.tracks) {
                this.tracksSelected = filters.tracks;
            }

            this.onSubmit();

            if (this.tracksSelected.length || this.levelsSelected.length) {
                jQuery('.filter').addClass('active');
            }
        });
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
