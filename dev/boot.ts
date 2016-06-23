///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {ENV} from "./config/env";
import {CONFIG} from "./config/config";
import {provide} from "angular2/core";
import {SpeakerService} from "./services/speaker.service";
import {ApiService} from "./services/api.service";
import {LevelService} from "./services/level.service";
import {TrackService} from "./services/track.service";
declare var localforage:any;

Promise.resolve(ENV).then((ENV) => {

    new Promise((resolve, reject) => {
        var a = localforage.config({
            name: 'connfa_web_app',
            storeName: 'connfa_web_app',
            driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE]
        });
        return resolve(localforage);
    }).then((localforage) => {
        bootstrap(AppComponent, [
            ROUTER_PROVIDERS,
            HTTP_PROVIDERS,
            SpeakerService,
            LevelService,
            TrackService,
            ApiService,
            provide('config', {useValue: CONFIG[ENV]}),
            provide('localforage', {useValue: localforage})
        ]);
    })

    // Promise.resolve(() => {
    //     localforage.config({
    //         storeName: 'connfa-web-app'
    //     })
    //     return localforage;
    // }).then((localforage1) => {
    //     console.log(localforage1);
    //     bootstrap(AppComponent, [
    //         ROUTER_PROVIDERS,
    //         HTTP_PROVIDERS,
    //         SpeakerService,
    //         provide('config', {useValue: CONFIG[ENV]}),
    //         provide('localforage', {useValue: localforage1})
    //     ]);
    // })

})

