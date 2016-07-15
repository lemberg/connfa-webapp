import {FavoritesComponent} from "../events_partials/favorites.component";
import {OnInit, Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SocialeventService} from "../../services/socialevent.service";
import {FilterComponent} from "../events_partials/filter.component";
import {SessionService} from "../../services/session.service";

declare var moment:any;

@Component({
    selector: 'socialevents-list',
    templateUrl: 'app/views/socialevents/menu.html',
    directives: [ROUTER_DIRECTIVES, FavoritesComponent, FilterComponent],
})


export class SocialeventsListComponent implements OnInit {

    socialevents = [];
    activeSocialevents = [];
    hours = [];

    constructor(private _socialeventService:SocialeventService) {
    }

    ngOnInit():any {
        this._socialeventService.getSocialevents().then(socialevents => {
            this.socialevents = this._socialeventService.formattedSocialevents;
            this.activeSocialevents = this._socialeventService.activeSocialevents;
            this.hours = this._socialeventService.hours;
        })

        this._socialeventService.socialeventsChanged$.subscribe(date => {
            console.log('CHANGED');
            this.activeSocialevents = this._socialeventService.activeSocialevents;
            this.hours = this._socialeventService.hours;
        })
    }
}
