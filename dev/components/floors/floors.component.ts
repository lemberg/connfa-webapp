import {Component, OnInit, Inject} from '@angular/core';
import {Floor} from "../../models/floors";
import {FloorService} from "../../services/floor.service";

@Component({
    selector: 'locations',
    templateUrl: 'app/views/floors/index.html',
    providers: [FloorService],
})

export class FloorsComponent implements OnInit{

    public floors: Floor[];
    public activeFloor: Floor;

    constructor(private _floorService: FloorService) {}

    ngOnInit():any {
        this._floorService.getFloors().then((floors: Floor[]) => {
            this._mapData();
        });

        this._floorService.floorsChanged$.subscribe(data => {
            this._mapData();
        })
    }

    onActivateFloor(floor) {
        this.activeFloor = floor;
    }

    private _mapData() {
        this.floors = this._floorService.floors
        this.activeFloor = this.floors[0];
    }
}
