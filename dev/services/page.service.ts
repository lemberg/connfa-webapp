import {Injectable, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {Page} from "../models/page";

@Injectable()

export class PageService {

    public pagesChanged$;
    public pages:Page[];

    private _pagesPromise = null;

    constructor(private _apiService:ApiService) {
        this.pagesChanged$ = new EventEmitter();

        this._apiService.dataChanged$.subscribe(data => {
            this.pages = [];
            this._pagesPromise = null;
            this.getPages().then((pages:Page[]) => {
                this.pagesChanged$.emit(pages);
            });
        })
    }

    getPages() {

        if (this._pagesPromise !== null) {
            return this._pagesPromise;
        }

        if (!this.pages || this.pages.length == 0) {
            return this._pagesPromise = this._apiService.getCollection('pages').then((pages:Page[])=> {
                this.pages = this._sortPages(pages);
                return pages;
            });
        } else {
            return Promise.resolve(this.pages)
        }

    }

    getPage(id) {
        return this.getPages().then((pages:Page[]) => {
            return pages.find((item: Page) => {
                return item.infoId == id;
            });
        });
    }

    private _sortPages(pages) {
        return pages.sort((a, b) => a.order > b.order);
    }
}
