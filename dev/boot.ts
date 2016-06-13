///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {ENV} from "./config/env";
import {CONFIG} from "./config/config";
import {provide} from "angular2/core";

Promise.resolve(ENV).then((ENV) => {
    bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS,  provide('config', { useValue: CONFIG[ENV] })]);
})

