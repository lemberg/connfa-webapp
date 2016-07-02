import {SpeakerService} from "../../services/speaker.service";
import {Speaker} from "../../models/speaker";
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'speakers-list',
    templateUrl: 'app/views/speakers/menu.html',
    directives: [ROUTER_DIRECTIVES],
    inputs: ['searchQuery']
})
export class SpeakersListComponent implements OnInit{

    public speakers: Speaker[];
    public filteredSpeakers;
    public alphabet;
    public searchQuery: string;

    constructor(private _speakerService: SpeakerService) {
        _speakerService.speakersChanged$.subscribe((speakers: Speaker[]) => {
            this._transformSpeakers(speakers)
        });
    }

    ngOnInit():any {
        this.getSpeakers();
    }

    getSpeakers() {
        this._speakerService.getSpeakers().then((speakers: Speaker[]) => {
            this._transformSpeakers(speakers);
        });
    }

    private _transformSpeakers(speakers: Speaker[]) {
        this.speakers = speakers;
        this.groupSpeakers(speakers).then(grouped => {
            this.filteredSpeakers = grouped;
            this.alphabet = Object.keys(grouped);
        });
    }

    private groupSpeakers(speakers: Speaker[]) {
        var grouped = [];
        return new Promise((resolve, reject) => {
            speakers.forEach(function (speaker: Speaker) {
                if (!grouped[speaker.firstName.charAt(0)]) {
                    grouped[speaker.firstName.charAt(0)] = [];
                }
                grouped[speaker.firstName.charAt(0)].push(speaker);
            })
            return resolve(grouped);
        })
    }
}
