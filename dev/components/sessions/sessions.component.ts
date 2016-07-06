
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {SessionService} from "../../services/session.service";

declare var moment: any;

@Component({
    templateUrl: 'app/views/sessions/sessions.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SessionService, EventService],
})

export class SessionsComponent {

    public sessions;
    public dates;
    public activeDate;

    public constructor(private _sessionService: SessionService) {
        this._sessionService.getSessions().then(sessions => {
                this.dates = this._sessionService.dates;
                this.activeDate = this.dates[0];
        });

        this._sessionService.sessionsChanged$.subscribe(date => {
            this.dates = this._sessionService.dates;
            this.activeDate = this.dates[0];
        });
    }

    public setActiveDate(date) {
        this._sessionService.setActiveDate(date);
        this.activeDate = date;
    }
}
