import {Component, OnInit, Input} from "@angular/core";
import {TrackService} from "../../services/track.service";
import {Track} from "../../models/track";
import {Level} from "../../models/level";
import {LevelService} from "../../services/level.service";
import {FilterService} from "../../services/filter.service";

declare var jQuery:any;

@Component({
    selector: 'events-filter',
    templateUrl: '../../views/events_partials/filter.html',
    providers: [FilterService],
})

export class FilterComponent implements OnInit {

    public tracks:Track[];
    public levels:Level[];
    public tracksSelected:any = [];
    public levelsSelected:any = [];
    public isCheckedAll:boolean = false;

    @Input() eventsType:string;

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

        this._filterService.getFilters().then((filters:any) => {
            console.log(filters);
            if (filters && filters.levels) {
                this.levelsSelected = filters.levels;
            }

            if (filters && filters.tracks) {
                this.tracksSelected = filters.tracks;
            }

            if (this.tracksSelected.length || this.levelsSelected.length) {
                this.onSubmit();
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

    public clearAll() {
        this.tracksSelected = [];
        this.levelsSelected = [];

        this.onSubmit();
    }

    public onSubmit() {
        this.levelsSelected.forEach((level:boolean, index:number) => {
            if (level == false) {
                delete this.levelsSelected[index];
            }
        })
        this.tracksSelected.forEach((track:boolean, index:number) => {
            if (track == false) {
                delete this.tracksSelected[index];
            }
        })
        this._filterService.filterEvents(this.levelsSelected, this.tracksSelected, this.eventsType);
    }

}
