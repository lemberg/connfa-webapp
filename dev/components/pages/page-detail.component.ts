import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";

@Component({
    selector: 'page-detail',
    templateUrl: 'app/views/pages/detail.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PageService],
})

export class PagesDetailComponent implements OnInit{

    public page: Page;

    constructor(private _pagesService: PageService, private _routerParams: RouteParams) {}

    ngOnInit():any {
        if (this._routerParams.get('id')) {
            this._pagesService.getPage(this._routerParams.get('id')).then((page: Page)=> {
                this.page = page;
            })
        }
    }
}
