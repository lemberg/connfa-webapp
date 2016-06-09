import {Component, OnInit} from 'angular2/core';
import {SpeakerDetailsComponent} from "./speaker-detail.component";
import {SpeakerService} from "./speaker.service";
import {Speaker} from "./speaker";
import {Router, ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";

@Component({
    selector: 'speakers-list',
    templateUrl: 'views/speakers/menu.html',
    directives: [SpeakerDetailsComponent, ROUTER_DIRECTIVES],
    providers: [SpeakerService],
})
@RouteConfig([
    {
        path: '/:id',
        name: 'Show',
        component: SpeakerDetailsComponent,
    },
    {
        path: '/',
        name: 'List',
        component: SpeakerDetailsComponent,
    },
])
export class SpeakersListComponent implements OnInit{

    public speakers: Speaker[];
    public filteredSpeakers;
    public alphabet;
    public searchQuery = '';

    constructor(private _speakerService: SpeakerService, private _router: Router) {}

    ngOnInit():any {
        this.getSpeakers();
    }

    searchSpeaker = function (value) {
        var filteredSpeakers = this.speakers.filter(this.filterSpeakers.bind(this, value));
        this.groupSpeakers(filteredSpeakers).then(grouped => {
            this.filteredSpeakers = grouped;
            this.alphabet = Object.keys(grouped);
        });
        console.log(this.filteredSpeakers);
    }

    private filterSpeakers(value, item) {
        if (item.firstName.toLocaleLowerCase().startsWith(value.toLowerCase()) ||
            item.lastName.toLowerCase().startsWith(value.toLowerCase())) {

            return true;
        }
    }

    private groupSpeakers(speakers) {
        var grouped = [];
        return new Promise((resolve, reject) => {
            speakers.forEach(function (speaker) {
                if (!grouped[speaker.firstName.charAt(0)]) {
                    grouped[speaker.firstName.charAt(0)] = [];
                }
                grouped[speaker.firstName.charAt(0)].push(speaker);
            })
            return resolve(grouped);
        })
    }

    getSpeakers() {
        this._speakerService.getSpeakers().then((speakers: Speaker[]) => {
            this.speakers = speakers;
            this.groupSpeakers(speakers).then(grouped => {
                this.filteredSpeakers = grouped;
                this.alphabet = Object.keys(grouped);
            });

        });
    }
}
