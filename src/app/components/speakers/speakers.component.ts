import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SpeakerService} from "../../services/speaker.service";
import {FORM_DIRECTIVES} from "@angular/forms";

@Component({
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: '../../views/speakers/speakers.html',
})

export class SpeakersComponent implements OnInit{

    public constructor(private _speakerService: SpeakerService) {}

    ngOnInit():any {
        return undefined;
    }

    public searchQuery:string;

    public searchSpeaker(value:string) {
        this.searchQuery = value;
        this._speakerService.search(value);
    }

    public clearSearch() {
        if (this.searchQuery === '') {
            jQuery('header.active').removeClass('active');
            jQuery('#search').blur();
        }

        this.searchQuery = '';
        this._speakerService.search('');
    }
}
