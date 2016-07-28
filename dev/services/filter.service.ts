import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";
import {BofService} from "./bof.service";
import {SocialeventService} from "./socialevent.service";

@Injectable()

export class FilterService {

    public constructor(private _sessionService: SessionService, private _bofService: BofService, private _socialeventService: SocialeventService) {

    }

    public filterEvents(levels, tracks, type) {
        switch (type) {
            case 'session':
                this._sessionService.filterEvents(levels, tracks);
                break;

            case 'bof':
                this._bofService.filterEvents(levels, tracks);
                break;

            case 'social':
                this._socialeventService.filterEvents(levels, tracks);
                break;
        }
    }
}
