import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";
import {PagesListComponent} from "./pages-list.component";

@Component({
    selector: 'page-detail',
    templateUrl: '../../views/pages/detail.html',
    directives: [ROUTER_DIRECTIVES, PagesListComponent],
})

export class PagesDetailComponent implements OnInit {

    public page:Page;

    constructor(private _pagesService:PageService, private _router:ActivatedRoute) {
    }

    ngOnInit():void {
        this._router.params.subscribe(params => {
            var id = params['id'];
            this._getPage(id);

            this._pagesService.pagesChanged$.subscribe((pages:Page[]) => {
                this._getPage(id);
            });
        });
    }

    private _getPage(id:number) {
        this._pagesService.getPage(id).then((page:Page)=> {
            this.page = page;
        })
    }
}
