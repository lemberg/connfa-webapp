import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Location} from "../../models/locations";
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'locations',
    templateUrl: 'app/views/locations/index.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LocationService],
})

export class LocationsComponent implements OnInit{

    constructor(private _locationService: LocationService) {}

    public location: Location;

    ngOnInit():any {
        this._locationService.getLocations().then((locations: Location[]) => {
            this.location = locations[0];
            console.log(this.location);
        });
    }


}
