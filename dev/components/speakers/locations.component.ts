import {Component, OnInit, Inject} from 'angular2/core';
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

    public location: Location;
    public config;

    constructor(private _locationService: LocationService, @Inject('config') config) {
        this.config = config;
    }

    ngOnInit():any {
        this._locationService.getLocations().then((locations: Location[]) => {
            this.location = locations[0];
        });
    }


}
