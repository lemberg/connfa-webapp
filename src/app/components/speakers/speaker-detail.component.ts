import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {Speaker} from "../../models/speaker";
import {SpeakerService} from "../../services/speaker.service";
import {SpeakersListComponent} from "./speakers-list.component";
import {SpeakersEventsService} from "../../services/speakers_events.service";
import {WindowService} from "../../services/window.service";

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

    constructor(private _speakerService:SpeakerService, private _router:ActivatedRoute, private windowService: WindowService) {
    }

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id:number = params['id'];
            if (!this.speaker || this.speaker.speakerId != id) {
                this._getSpeaker(id);
            }

            if (id) {
                jQuery('body').addClass('overflowHidden');

                if (!this.windowService.isDesktop()) {
                    jQuery('#page section.info').addClass('hide-content1');
                }
            }
        });

        this._speakerService.speakersChanged$.subscribe((data:string|Speaker[]) => {
            if (data.length && this.speaker && this.speaker.speakerId) {
                this._getSpeaker(this.speaker.speakerId);
            }
        });
    }

    ngOnDestroy():void {
        jQuery('body').removeClass('overflowHidden');
        jQuery('#page section.info').removeClass('hide-content');
    }

    private _getSpeaker(id:number):void {
        this._speakerService.getSpeaker(id).then((speaker:Speaker)=> {
            this.speaker = speaker;
        });
    }
}
