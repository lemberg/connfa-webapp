import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {Speaker} from "../../models/speaker";
import {SpeakerService} from "../../services/speaker.service";
import {SpeakersListComponent} from "./speakers-list.component";
import {SpeakersEventsService} from "../../services/speakers_events.service";

declare var jQuery:any;

@Component({
    selector: 'speaker-details',
    templateUrl: '../../views/speakers/detail.html',
    inputs: ["speaker"],
    directives: [ROUTER_DIRECTIVES, SpeakersListComponent],
    providers: [SpeakersEventsService]
})

export class SpeakerDetailsComponent implements OnInit, OnDestroy {

    public speaker:Speaker;
    public eventRoutes = {
        'session': '/sessions/',
        'bof': '/bofs/',
        'social': '/socialevents/'
    };

    constructor(private _speakerService:SpeakerService, private _router:ActivatedRoute) {
    }

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id = params['id'];
            this._getSpeaker(id);

            this._speakerService.speakersChanged$.subscribe((data:Speaker[]) => {
                this._getSpeaker(id);
            });
        });

        jQuery('body').addClass('overflowHidden');
    }

    ngOnDestroy():void {
        jQuery('body').removeClass('overflowHidden');
    }

    private _getSpeaker(id:number):void {
        this._speakerService.getSpeaker(id).then((speaker:Speaker)=> {
            this.speaker = speaker;
        });
    }
}
