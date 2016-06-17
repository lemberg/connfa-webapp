import {Component, OnInit, Inject} from 'angular2/core';
import {Location} from "../../models/locations";
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'locations',
    templateUrl: 'app/views/floors/index.html',
    providers: [],
})

export class FloorsComponent implements OnInit{


    constructor() {

    }

    ngOnInit():any {

    }


}
