
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {BofService} from "../../services/bof.service";

declare var moment: any;

@Component({
    templateUrl: 'app/views/bofs/bofs.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [BofService, EventService],
})

export class BofsComponent {

    public bofs;
    public dates;
    public activeDate;

    public constructor(private _bofService: BofService) {
        console.log('Bof base INIT');
        this._bofService.getBofs().then(bofs => {
            this.bofs = this._bofService.bofs;
            this.dates = this._bofService.dates;
            this.activeDate = this._bofService.activeDate || this.dates[0];
        });

        this._bofService.bofsChanged$.subscribe(date => {
            this.dates = this._bofService.dates;
            this.activeDate = this._bofService.activeDate || this.dates[0];
        });
    }

    public setActiveDate(date) {
        this._bofService.setActiveDate(date);
        this.activeDate = date;
    }
}
