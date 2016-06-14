import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

@Component({
    selector: 'main-menu',
    templateUrl: 'app/views/menu.html',
    directives: [ROUTER_DIRECTIVES],
})
export class MenuComponent {
    constructor(private router:Router) {
    }

    isActive(instruction:any[]):boolean {

        return this.router.isRouteActive(this.router.generate(instruction));
    }
}
