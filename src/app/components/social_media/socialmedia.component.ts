import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../services/setting.service";

import '../../../../public/js/twitter.js';

declare var twttr:any;

@Component({
    selector: 'socail-media',
    templateUrl: '../../views/social_media/index.html',
    providers: [SettingService],
})

export class SocialmediaComponent implements OnInit {

    public widget:any;
    public twitterWidgetId:string;
    public showWidget:boolean = false;

    constructor(private _settings:SettingService) {
    }

    ngOnInit():any {
        this._settings.getSetting('twitterWidgetId').then((twitterWidgetId:string) => {
            if (twitterWidgetId) {
                this.twitterWidgetId = twitterWidgetId;
                this.widget = twttr.widgets.createTimeline(
                    twitterWidgetId,
                    document.getElementById("container")
                ).then((data:HTMLIFrameElement) => {
                    if (data) {
                        this.showWidget = true;
                    }
                });
            }
        });
    }
}

