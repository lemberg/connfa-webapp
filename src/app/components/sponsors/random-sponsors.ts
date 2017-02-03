import {Component, OnInit} from '@angular/core';
import {Sponsor} from "../../models/sponsor";
import {SponsorsService} from "../../services/sponsors.service";

@Component({
    selector: 'random-sponsors',
    templateUrl: '../../views/sponsors/random.html'
})

export class RandomSponsorsComponent implements OnInit {

    public sponsors: Sponsor[];

    constructor(private _sponsorsService: SponsorsService) {

    }

    ngOnInit() {
        this.sponsors = this._sponsorsService.getSponsors().slice(0, 4);
    }

    public getImage(picture: string) {
        return require("../../../assets/images/" + picture);
    }

}
