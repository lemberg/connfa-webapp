import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Page} from "../models/page";

@Injectable()

export class PageService {

    constructor(private _apiService: ApiService) {}

    pages:Page[];

    getPages() {

        if (!this.pages || this.pages.length == 0) {
            return this._apiService.getCollection('pages').then((pages: Page[])=> {
                this.pages = this._sortPages(pages);
                return pages;
            });
        } else {
            return Promise.resolve(this.pages)
        }

    }

    getPage(id) {
        return new Promise((resolve, reject) => {
            this.getPages().then((pages: Page[]) => {
                pages.forEach(item => {
                    if (item.infoId == id) {
                        resolve(item);
                    }
                })
            });
        })
    }

    private _sortPages(pages) {
        return pages.sort((a, b) => a.order < b.order);
    }
}
