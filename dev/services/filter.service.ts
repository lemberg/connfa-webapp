import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";

@Injectable()

export class FilterService {
    public eventsFiltered$;

    public constructor(private _sessionService: SessionService) {

    }

    public filterEvents(levels, tracks, type) {
        switch (type) {
            case 'session':
                this._sessionService.filterEvents(levels, tracks);
        }
    }
}
