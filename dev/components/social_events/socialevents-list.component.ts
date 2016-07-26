import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {SocialeventService} from "../../services/socialevent.service";
import {FilterComponent} from "../events_partials/filter.component";

declare var moment:any;

@Component({
    selector: 'events-list',
    templateUrl: 'app/views/events_partials/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class SocialeventsListComponent implements OnInit {

    socialevents = [];
    activeEvents = [];
    hours = [];

    public router = '/socialevents/';
    public event_type = 'social';

    constructor(private _socialeventService:SocialeventService) {
    }

    ngOnInit():any {
        this._socialeventService.getSocialevents().then(socialevents => {
            this.socialevents = this._socialeventService.formattedSocialevents;
            this.activeEvents = this._socialeventService.activeSocialevents;
            this.hours = this._socialeventService.hours;
        })

        this._socialeventService.socialeventsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.activeEvents = this._socialeventService.activeSocialevents;
            this.hours = this._socialeventService.hours;
        })
    }
}
