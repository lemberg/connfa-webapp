import {Component} from '@angular/core';
import {PageService} from "../../services/page.service";

@Component({
    selector: 'page-detail',
    templateUrl: '../../views/pages/pages.html',
    providers: [PageService],
})

export class PagesComponent{}
