import {Component, OnInit, Inject} from '@angular/core';
import {Location} from "../../models/locations";
import {LocationService} from "../../services/location.service";
import {DomSanitizationService, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'locations',
    templateUrl: '../../views/locations/index.html',
    directives: [],
    providers: [LocationService],
})

export class LocationsComponent implements OnInit{

    public location: Location;
    public config:any;
    public showLocation:boolean;
    public locationUrl:SafeResourceUrl;

    constructor(private _locationService: LocationService, @Inject('config') config:any, private sanitationService:DomSanitizationService) {
        this.config = config;
    }

    ngOnInit():any {
        this._locationService.getLocations().then((locations: Location[]) => {
            this.applyLocation(locations);
        });

        this._locationService.locationsChanged$.subscribe((locations: Location[]) => {
            this.applyLocation(locations);
        });
    }

    private applyLocation(locations: Location[]):any {
        this.location = locations[0];

        if (this.location) {
            this.showLocation = true;
            this.locationUrl= this.sanitationService.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key='+this.config.googleApiKey+'&q='+this.location.address);
        }
    }


}
