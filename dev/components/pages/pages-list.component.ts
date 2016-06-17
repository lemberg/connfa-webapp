import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {PageService} from "../../services/page.service";
import {Page} from "../../models/page";
import {PagesDetailComponent} from "./page-detail.component";

@Component({
    selector: 'pages-list',
    templateUrl: 'app/views/pages/menu.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PageService],
})
@RouteConfig([
    {
        path: '/:id',
        name: 'Show',
        component: PagesDetailComponent,
    },
    {
        path: '/',
        name: 'List',
        component: PagesDetailComponent,
    },
])
export class PagesListComponent implements OnInit{

    public pages: Page[];

    constructor(private _pagesService: PageService, private _router: Router) {}

    ngOnInit():any {
        this._pagesService.getPages().then((pages: Page[]) => this.pages = pages);
    }
}
