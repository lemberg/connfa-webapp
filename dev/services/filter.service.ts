import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";
import {BofService} from "./bof.service";

@Injectable()

export class FilterService {

    public constructor(private _sessionService: SessionService, private _bofService: BofService) {

    }

    public filterEvents(levels, tracks, type) {
        switch (type) {
            case 'session':
                this._sessionService.filterEvents(levels, tracks);

            case 'bof':
                this._bofService.filterEvents(levels, tracks);
        }
    }
}
