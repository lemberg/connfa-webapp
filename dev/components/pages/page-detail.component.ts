import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";
import {PagesListComponent} from "./pages-list.component";

@Component({
    selector: 'page-detail',
    templateUrl: 'app/views/pages/detail.html',
    directives: [ROUTER_DIRECTIVES, PagesListComponent],
})

export class PagesDetailComponent implements OnInit{

    public page: Page;

    constructor(private _pagesService: PageService, private _router: ActivatedRoute) {}

    ngOnInit():any {
        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._pagesService.getPage(params['id']).then((page: Page)=> {
                    this.page = page;
                })
            });
        }
    }
}
