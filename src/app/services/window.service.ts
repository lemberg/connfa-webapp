import {Injectable} from '@angular/core';

@Injectable()
export class WindowService {

    private _desktopSize = 980;

    constructor() {
    }

    public isDesktop() {
        if (window.innerWidth >= this._desktopSize) {
            return true;
        }

        return false;
    }
}
