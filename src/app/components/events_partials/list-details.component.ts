import {Component, OnInit, Input} from '@angular/core';
import {FavoritesComponent} from "./favorites.component";

@Component({
    selector: 'event-list-details',
    directives: [FavoritesComponent],
    templateUrl: '../../views/events_partials/list-details.html',
})
export class ListDetailsComponent implements OnInit {

    @Input() event:any;
    @Input() activeEvents:any;
    @Input() hour:string;

    constructor() {
    }

    ngOnInit():void {
    }
}
