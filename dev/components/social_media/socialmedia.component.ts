import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../services/setting.service";

declare var twttr: any;

@Component({
    selector: 'socail-media',
    templateUrl: 'app/views/social_media/index.html',
    providers: [SettingService],
})

export class SocialmediaComponent implements OnInit{

    public widget;

    constructor(private _settings: SettingService) {
    }

    ngOnInit():any {
        this._settings.getSetting('twitterWidgetId').then(twitterWidgetId => {
            this.widget = twttr.widgets.createTimeline(
                twitterWidgetId,
                document.getElementById("container"),
                {
                    height: '100%',
                    width: '100%',
                }
            ).then(data => {
                console.log(data);
            });
        });
    }
}
