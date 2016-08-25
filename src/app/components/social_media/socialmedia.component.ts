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

    constructor(private _settings:SettingService) {
    }

    ngOnInit():any {
        this._settings.getSetting('twitterWidgetId').then((twitterWidgetId:string) => {
            this.widget = twttr.widgets.createTimeline(
                twitterWidgetId,
                document.getElementById("container"),
                {
                    height: '92%',
                    width: '100%',
                }
            ).then((data:any) => {
                console.log(data);
            });
        });
    }
}
