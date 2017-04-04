import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'page-detail',
    templateUrl: '../../views/pages/detail.html',
})

export class PagesDetailComponent implements OnInit {

    public page:Page;

    constructor(private _pagesService:PageService, private _router:ActivatedRoute, private _sanitizer: DomSanitizer) {
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
            if (page) {
                this.page = page;
                this.page.sanitizedHtml = this._sanitizer.bypassSecurityTrustHtml(this.page.html);
            }
        })
    }
}
