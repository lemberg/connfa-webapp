import {Component, OnInit, Inject} from 'angular2/core';
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
            this.floors = floors
            this.activeFloor = floors[0];
        });
    }

    onActivateFloor(floor) {
        this.activeFloor = floor;
    }
}
