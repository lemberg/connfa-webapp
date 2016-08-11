import { Component, OnInit } from '@angular/core';
import {FavoritesComponent} from "./favorites.component";

@Component({
    selector: 'event-list-details',
    inputs: ["event", "activeEvents", "hour"],
    directives: [FavoritesComponent],
    templateUrl: '/app/views/events_partials/list-details.html',
})
export class ListDetailsComponent implements OnInit {

    public event;
    public activeEvents;
    public hour;

    constructor() { }

    ngOnInit() { }
}
