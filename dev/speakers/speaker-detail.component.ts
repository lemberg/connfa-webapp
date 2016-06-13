import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {SpeakerService} from "./speaker.service";
import {Speaker} from "./speaker";

@Component({
    selector: 'speaker-details',
    templateUrl: 'views/speakers/detail.html',
    inputs: ["speaker"],
    directives: [ROUTER_DIRECTIVES],
})

export class SpeakerDetailsComponent implements OnInit{

    public speaker: Speaker;
    public showView = false;

    constructor(private _speakerService: SpeakerService, private _routerParams: RouteParams) {}

    ngOnInit():any {

        if (this._routerParams.get('id')) {
            this.showView = true;
            this._speakerService.getSpeaker(this._routerParams.get('id')).then((speaker: Speaker)=> {
                this.speaker = speaker;
            })
        }
    }
}
