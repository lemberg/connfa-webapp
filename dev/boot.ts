import {AppComponent} from "./app.component";
import {ENV} from "./config/env";
import {CONFIG} from "./config/config";
import {provide, enableProdMode} from "@angular/core";
import {SpeakerService} from "./services/speaker.service";
import {ApiService} from "./services/api.service";
import {LevelService} from "./services/level.service";
import {TrackService} from "./services/track.service";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {EventService} from "./services/event.service";
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
        enableProdMode();
        bootstrap(AppComponent, [
            APP_ROUTER_PROVIDERS,
            HTTP_PROVIDERS,
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

