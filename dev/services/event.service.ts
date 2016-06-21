import {Injectable} from "angular2/core";
import {ApiService} from "./api.service";
import {Event} from "../models/event";

declare var moment: any;

@Injectable()

export class EventService {

    constructor(private _apiService:ApiService) {
    }

    events = [];

    getEventsByType(type) {
        if (!this.events[type]) {
            return this._apiService.getCollection('events').then((events:Event[])=> {
                var eventsOfType = events
                    .filter(this.filterByType.bind(this, type))
                    .sort((a, b) => {
                        var first = moment(a.from).format('x');
                        var second = moment(b.from).format('x');

                        if (first < second) {
                            return -1;
                        } else if (first > second) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                this.events[type] = eventsOfType;
                return eventsOfType;
            });
        } else {
            return Promise.resolve(this.events[type]);
        }

    }

    private filterByType(type, event) {
        return event.event_type == type;
    }
}
