import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {Speaker} from "../../models/speaker";
import {SpeakerService} from "../../services/speaker.service";
import {SpeakersListComponent} from "./speakers-list.component";
import {SpeakersEventsService} from "../../services/speakers_events.service";

@Component({
    selector: 'speaker-details',
    templateUrl: 'app/views/speakers/detail.html',
    inputs: ["speaker"],
    directives: [ROUTER_DIRECTIVES, SpeakersListComponent],
    providers: [SpeakersEventsService]
})

export class SpeakerDetailsComponent implements OnInit{

    public speaker: Speaker;
    public eventRoutes = {
         'session':'/sessions/',
         'bof':'/bofs/',
         'social':'/socialevents/'
    };

    constructor(private _speakerService: SpeakerService, private _router: ActivatedRoute ) {}

    ngOnInit():any {

        this._router.params.subscribe(params => {
            var id = params['id'];
            this._getSpeaker(id);

            this._speakerService.speakersChanged$.subscribe(data => {
                this._getSpeaker(id);
            });
        });
    }

    private _getSpeaker(id):void {
        this._speakerService.getSpeaker(id).then((speaker: Speaker)=> {
            this.speaker = speaker;
        });
    }
}
