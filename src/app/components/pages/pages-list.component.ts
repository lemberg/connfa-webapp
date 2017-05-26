import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";
import {WindowService} from "../../services/window.service";

@Component({
    selector: 'pages-list',
    templateUrl: '../../views/pages/menu.html',
})

export class PagesListComponent implements OnInit {

    public pages: Page[];

    constructor(private _pagesService: PageService, private _windowService: WindowService, private _router: Router) {
    }

    ngOnInit(): any {
        this._pagesService.getPages().then((pages: Page[]) => {
            this.pages = pages
            if (this._router.isActive('pages', true) && this._windowService.isDesktop()) {
                return this._router.navigate(['pages', this.pages[0].infoId]);
            }
        });

        this._pagesService.pagesChanged$.subscribe((pages: Page[]) => this.pages = pages);
    }
}
