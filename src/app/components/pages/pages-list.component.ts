import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";

@Component({
    selector: 'pages-list',
    templateUrl: '../../views/pages/menu.html',
    directives: [ROUTER_DIRECTIVES],
})

export class PagesListComponent implements OnInit{

    public pages: Page[];

    constructor(private _pagesService: PageService) {
    }

    ngOnInit():any {
        this._pagesService.getPages().then((pages: Page[]) => this.pages = pages);
        this._pagesService.pagesChanged$.subscribe((pages: Page[]) => this.pages = pages);
    }
}
