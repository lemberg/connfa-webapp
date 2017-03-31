import {EventService} from "../services/event.service";
import {Router} from "@angular/router";
import {WindowService} from "../services/window.service";
import {Event} from "../models/event";

export class EventComponent {

    public dates: string[] = [];
    public activeDate: string;
    public router: string;
    protected _eventService: EventService;
    protected _router: Router;
    protected _windowService: WindowService;

    public swipe(activeDate: string, direction: string) {
        var activeIndex = this.dates.indexOf(activeDate);
        if (activeIndex > 0 && direction === 'right') {
            activeIndex -= 1;
        }

        if (activeIndex < this.dates.length - 1 && direction === 'left') {
            activeIndex += 1;
        }

        this.setActiveDate(this.dates[activeIndex]);
    }

    public setActiveDate(date: string) {
        this._eventService.setActiveDate(date);
        this.activeDate = date;
        this.redirectToFirst(this._eventService.activeEvents, true);
    }

    public redirectToFirst(activeEvents: any, force:boolean = false) {
        if (!force) {
            force = this._router.isActive(this.router, true);
        }
        if (force && this._windowService.isDesktop()) {
            this._getFirstActiveEvent(activeEvents).then((event: Event) => {
                this._router.navigate([this.router, event.eventId]);
            });
        }
    }

    private _getFirstActiveEvent(activeEvents: any) {
        var hours = Object.keys(activeEvents);
        var promise = new Promise((resolve, reject) => {
            hours.forEach(hour => {
                activeEvents[hour].forEach((event: Event) => {
                    if (!this._eventService.isNonClickable(event.type)) {

                        return resolve(event);
                    }
                });
            });
        });

        return Promise.resolve(promise);
    }

    public getKeys(obj: Object) {
        return Object.keys(obj)
    }
}
