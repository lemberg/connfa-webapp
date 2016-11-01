import {SpeakerService} from "../../services/speaker.service";
import {Speaker} from "../../models/speaker";
import {Component, OnInit} from "@angular/core";

declare var jQuery:any;

@Component({
    selector: 'speakers-list',
    templateUrl: '../../views/speakers/menu.html',
    inputs: ['searchQuery']
})
export class SpeakersListComponent implements OnInit{

    public speakers: Speaker[];
    public filteredSpeakers:any;
    public alphabet:string[];
    public searchQuery: string;

    constructor(private _speakerService: SpeakerService) {
        _speakerService.speakersChanged$.subscribe((speakers: Speaker[]) => {
            this._transformSpeakers(speakers)
        });
    }

    ngOnInit():any {
        this.getSpeakers();
    }

    public getSpeakers() {
        this._speakerService.getSpeakers().then((speakers: Speaker[]) => {
            this._transformSpeakers(speakers);
        });
    }

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

    private _transformSpeakers(speakers: Speaker[]) {
        this.speakers = speakers;
        this.groupSpeakers(speakers).then(grouped => {
            this.filteredSpeakers = grouped;
            this.alphabet = Object.keys(grouped);
        });
    }

    private groupSpeakers(speakers: Speaker[]) {
        var grouped:any[] = [];
        return new Promise((resolve, reject) => {
            speakers.forEach(function (speaker: Speaker) {
                var key = speaker.firstName.charAt(0).toUpperCase();
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(speaker);
            })
            return resolve(grouped);
        })
    }

    public getKeys(obj:any) {
        return Object.keys(obj)
    }
}
