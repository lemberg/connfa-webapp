import {Injectable} from "@angular/core";
import {EventService} from "./event.service";
import {EventEmitter} from "@angular/core";

declare var moment: any;

@Injectable()

export class SocialeventService{

    public socialevents;
    public formattedSocialevents;
    public dates;
    public activeDate;
    public activeSocialevents;
    public hours;
    public socialeventsChanged$;

    private socialeventsPromise = null;


    public constructor(private _eventService: EventService) {
        this.socialeventsChanged$ = new EventEmitter();
    }

    public getSocialevents() {
        if (this.socialeventsPromise !== null) {
            return this.socialeventsPromise;
        }

        if (!this.socialevents) {

            return this.socialeventsPromise = this._eventService.getEventsByType('social').then(socialevents => {
                console.log('in getSocialevents Promise');


                return new Promise((resolve, reject) => {
                    this.socialevents = socialevents;

                    this.transformEvents(socialevents).then(data => {
                        this.bindChanges(data);
                        resolve();
                    })
                })
            });
        } else {
            return Promise.resolve(this.socialevents);
        }
    }

    public getSocialevent(id) {
        return this.getSocialevents().then(socialevents => {
            var socialevent = this.socialevents.filter((socialevent) => {
                  return id == socialevent.eventId;
            });

            return socialevent[0];
        })
    }


    public setActiveDate(date) {
        this.activeDate = date;
        this.activeSocialevents = this.formattedSocialevents[this.activeDate];
        this.hours = Object.keys(this.activeSocialevents);
        this.socialeventsChanged$.emit(date);
    }

    public filterEvents(levels, tracks) {
        this.getSocialevents().then(socialevents => {

            var promise = new Promise((resolve, reject) => {
                var filteredSocialevents = [];
                this.socialevents.forEach(socialevent => {
                    if (this.inLevels(socialevent, levels) && this.inTracks(socialevent, tracks)) {
                        filteredSocialevents.push(socialevent);
                    }
                });
                resolve(filteredSocialevents);
            })

            promise.then(socialevents => {
                this.transformEvents(socialevents).then(data => {
                    this.bindChanges(data, true);
                    this.socialeventsChanged$.emit('adsasd');
                })
            })
        });
    }

    public toggleFavorite(socialevent, isFavorite) {

        this.socialevents.find(item => {
            if (item.eventId === socialevent.eventId) {
                item.isFavorite = isFavorite;
                return true;
            }
            return false;
        });

        this.transformEvents(this.socialevents).then(data => {
            this.bindChanges(data);
        }).then(() => {
            this._eventService.toggleFavorite(socialevent, 'social');
            this.socialeventsChanged$.emit('changed');
        })
    }

    private inLevels(socialevent, levels) {
        var levelId = socialevent.experienceLevel;
        if (!Object.keys(levels).length) {
            return true;
        }

        if (levels && levels[levelId] == true) {
            return true;
        } else {
            return false;
        }
    }

    private inTracks(socialevent, tracks) {
        var trackId = socialevent.track;
        if (!Object.keys(tracks).length) {
            return true;
        }
        if (tracks && tracks[trackId] == true) {
            return true;
        } else {

            return false;
        }
    }

    private bindChanges(data, changeActiveDate = false) {

        this.formattedSocialevents = data;
        this.dates = this.getDates(data);
        this.activeDate = this.activeDate || this.dates[0];
        if (changeActiveDate) {
            this.activeDate = this.dates[0];
        }
        this.activeSocialevents = this.formattedSocialevents[this.activeDate];
        this.hours = Object.keys(this.activeSocialevents);

    }

    private transformEvents(events) {
        var transformed = [];
        return new Promise((resolve, reject) => {
            events.forEach((event: Event) => {
                var event_day = moment(event.from).format('ddd D');
                var event_hours = moment(event.from).format('LT') +' '+ moment(event.to).format('LT');

                if (!transformed[event_day]) {
                    transformed[event_day] = [];
                }

                if (!transformed[event_day][event_hours]) {
                    transformed[event_day][event_hours] = [];
                }

                transformed[event_day][event_hours].push(this.transformEvent(event));
            });

            return resolve(transformed);
        });
    }

    private transformEvent(event) {
        var transformed = event;
        transformed.fromLabel = moment(event.from).format('LT');
        transformed.toLabel = moment(event.to).format('LT');

        return transformed;
    }

    private getDates(data) {
        return Object.keys(data);
    }
}
