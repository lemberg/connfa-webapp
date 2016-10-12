import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ApiService} from "./services/api.service";

declare var jQuery: any;

import '../../public/styles/normalize.css';
import '../../public/styles/style.css';
import '../../public/js/jquery-1.9.1.min.js'
import '../../public/js/script.js';
import '../../public/js/hammer.js';

@Component({
	selector: 'app',
	templateUrl: './views/app.component.html',
	directives: [ROUTER_DIRECTIVES],
    providers: []
})


export class AppComponent {
    constructor(private _apiService: ApiService) {
        this._apiService.grabUpdates();
    }

    public closeMenu() {
        console.log('here');
        if(jQuery('body').hasClass("animate")==false){
            jQuery('body').toggleClass('open');
            jQuery('body').addClass('animate');
            setTimeout(function () {
                jQuery('body').removeClass('animate');
            }, 700);
        }
    }
}

