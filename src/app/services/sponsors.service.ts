import { Injectable } from '@angular/core';
import {Sponsor} from "../models/sponsor";
import {SPONSORS} from "../models/mock-sponsors";

@Injectable()

export class SponsorsService {

    constructor() { }

    public getSponsors(): Sponsor[] {
        return this.shuffle(SPONSORS);
    }

    public getSponsorsByType(type:string): Sponsor[] {
        var sponsors = SPONSORS.filter((sponsor: Sponsor) => {
            return sponsor.type === type;
        })

        return this.shuffle(sponsors);
    }

    private shuffle(array:Sponsor[]) {
        for (var i = array.length; i > 0; --i) {
            array.push(array.splice(Math.random() * i | 0, 1)[0]);
        }
        return array;
    }
}
