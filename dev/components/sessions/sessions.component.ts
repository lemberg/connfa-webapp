
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {SessionService} from "../../services/session.service";

declare var moment: any;
declare var jQuery: any;

@Component({
    selector: 'sessions',
    templateUrl: 'app/views/sessions/sessions.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SessionService, EventService],
})

export class SessionsComponent implements OnInit{

    public sessions;
    public dates;
    public activeDate;

    public constructor(private _sessionService: SessionService) {
    }

    ngOnInit():any {
        console.log('here');
        this._sessionService.getSessions().then(sessions => {
            this.sessions = this._sessionService.sessions;
            this.dates = this._sessionService.dates;
            this.activeDate = this._sessionService.activeDate || this.dates[0];
        });

        this._sessionService.sessionsChanged$.subscribe(date => {
            this.dates = this._sessionService.dates;
            this.activeDate = this._sessionService.activeDate || this.dates[0];
        });

        jQuery('body').addClass('view');
    }

    public setActiveDate(date) {
        this._sessionService.setActiveDate(date);
        this.activeDate = date;
    }
}
