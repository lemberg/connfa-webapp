import {EventService} from "../services/event.service";
/**
 * Created by ym on 11.10.16.
 */

export class EventComponent {

    public dates:string[] = [];
    public activeDate:string;
    protected _eventService:EventService;

    public swipe(activeDate:string, direction:string) {
        var activeIndex = this.dates.indexOf(activeDate);
        if (activeIndex > 0 && direction === 'right') {
            activeIndex -= 1;
        }

        if (activeIndex < this.dates.length - 1 && direction === 'left') {
            activeIndex += 1;
        }

        this.setActiveDate(this.dates[activeIndex]);
    }

    public setActiveDate(date:string) {
        this._eventService.setActiveDate(date, true);
        this.activeDate = date;
    }

    public getKeys(obj: Object) {
        return Object.keys(obj)
    }

}
