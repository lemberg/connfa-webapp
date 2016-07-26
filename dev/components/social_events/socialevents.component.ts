
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {SocialeventService} from "../../services/socialevent.service";

declare var moment: any;
declare var jQuery: any;

@Component({
    templateUrl: 'app/views/socialevents/socialevents.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SocialeventService, EventService],
})

export class SocialeventsComponent {

    public socialevents;
    public dates;
    public activeDate;

    public constructor(private _socialeventService: SocialeventService) {
        console.log('Socialevent base INIT');
        this._socialeventService.getSocialevents().then(socialevents => {
            this.socialevents = this._socialeventService.socialevents;
            this.dates = this._socialeventService.dates;
            this.activeDate = this._socialeventService.activeDate || this.dates[0];
        });

        this._socialeventService.socialeventsChanged$.subscribe(date => {
            this.dates = this._socialeventService.dates;
            this.activeDate = this._socialeventService.activeDate || this.dates[0];
        });

        jQuery('body').addClass('view');
    }

    public setActiveDate(date) {
        this._socialeventService.setActiveDate(date);
        this.activeDate = date;
    }
}
