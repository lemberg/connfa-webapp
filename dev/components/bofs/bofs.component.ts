
import {Component, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EventService} from "../../services/event.service";
import {BofService} from "../../services/bof.service";

declare var moment: any;
declare var jQuery: any;

@Component({
    selector: 'bofs',
    templateUrl: 'app/views/bofs/bofs.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [BofService, EventService],
})

export class BofsComponent {

    public dates;
    public activeDate;

    public constructor(private _bofService: BofService, private _el:ElementRef) {

        this._bofService.getBofs().then(bofs => {
            this._mapData();
        });

        this._bofService.bofsChanged$.subscribe(date => {
            this._mapData();
        });

        jQuery('body').addClass('view');
    }

    private _mapData() {
        this.dates = this._bofService.dates;
        this.activeDate = this._bofService.activeDate || this.dates[0];
    }

    public setActiveDate(date) {
        this._bofService.setActiveDate(date);
        this.activeDate = date;
    }

    private getParentByTagName(node, tagname) {
        var parent;
        if (node === null || tagname === '') return;
        parent  = node.parentNode;
        tagname = tagname.toUpperCase();

        while (parent.tagName !== "HTML") {
            if (parent.tagName === tagname) {
                return parent;
            }
            parent = parent.parentNode;
        }

        return parent;
    }
}
