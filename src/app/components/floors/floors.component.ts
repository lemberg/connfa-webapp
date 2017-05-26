import {Component, OnInit, OnDestroy} from '@angular/core';
import {Floor} from "../../models/floors";
import {FloorService} from "../../services/floor.service";

declare var jQuery: any;

@Component({
    selector: 'locations',
    templateUrl: '../../views/floors/index.html',
    providers: [FloorService],
})

export class FloorsComponent implements OnInit, OnDestroy{

    public floors: Floor[];
    public activeFloor: Floor;

    constructor(private _floorService: FloorService) {}

    ngOnInit():void {
        this._floorService.getFloors().then((floors: Floor[]) => {
            this._mapData();
        });

        this._floorService.floorsChanged$.subscribe((data: Floor[]) => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    ngOnDestroy():void {
        jQuery('body').removeClass('view');
    }

    onActivateFloor(floor: Floor) {
        this.activeFloor = floor;
    }

    private _mapData():void {
        this.floors = this._floorService.floors
        this.activeFloor = this.floors[0];
    }
}
