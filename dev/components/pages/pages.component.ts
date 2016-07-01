import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, } from "@angular/router";
import {PageService} from "../../services/page.service";

@Component({
    selector: 'page-detail',
    templateUrl: 'app/views/pages/pages.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [PageService],
})

export class PagesComponent{}
