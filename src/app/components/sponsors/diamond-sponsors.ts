import {Component, OnInit} from '@angular/core';
import {Sponsor} from "../../models/sponsor";
import {SponsorsService} from "../../services/sponsors.service";

@Component({
    selector: 'diamond-sponsors',
    templateUrl: '../../views/sponsors/diamond.html'
})

export class DiamondSponsorsComponent implements OnInit {

    public sponsors: Sponsor[];

    constructor(private _sponsorsService: SponsorsService) {

    }

    ngOnInit() {
        this.sponsors = this._sponsorsService.getSponsorsByType('diamond').slice(0, 2);
    }

    public getImage(picture: string) {
        return require("../../../assets/images/" + picture);
    }

}
