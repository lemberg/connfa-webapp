import {Injectable} from "@angular/core";
import {EventService} from "./event.service";
import {EventEmitter} from "@angular/core";

declare var moment: any;

@Injectable()

export class BofService{

    public bofs;
    public formattedBofs;
    public dates;
    public activeDate;
    public activeBofs;
    public hours;
    public bofsChanged$;

    private bofsPromise = null;


    public constructor(private _eventService: EventService) {
        this.bofsChanged$ = new EventEmitter();
    }

    public getBofs() {
        if (this.bofsPromise !== null) {
            return this.bofsPromise;
        }

        if (!this.bofs) {

            return this.bofsPromise = this._eventService.getEventsByType('bof').then(bofs => {
                console.log('in getBofs Promise');


                return new Promise((resolve, reject) => {
                    this.bofs = bofs;

                    this.transformEvents(bofs).then(data => {
                        this.bindChanges(data);
                        resolve();
                    })
                })
            });
        } else {
            return Promise.resolve(this.bofs);
        }
    }

    public getBof(id) {
        return this.getBofs().then(bofs => {
            var bof = this.bofs.filter((bof) => {
                  return id == bof.eventId;
            });

            return bof[0];
        })
    }


    public setActiveDate(date) {
        this.activeDate = date;
        this.activeBofs = this.formattedBofs[this.activeDate];
        this.hours = Object.keys(this.activeBofs);
        this.bofsChanged$.emit(date);
    }

    public filterEvents(levels, tracks) {
        this.getBofs().then(bofs => {

            var promise = new Promise((resolve, reject) => {
                var filteredBofs = [];
                this.bofs.forEach(bof => {
                    if (this.inLevels(bof, levels) && this.inTracks(bof, tracks)) {
                        filteredBofs.push(bof);
                    }
                });
                resolve(filteredBofs);
            })

            promise.then(bofs => {
                this.transformEvents(bofs).then(data => {
                    this.bindChanges(data, true);
                    this.bofsChanged$.emit('adsasd');
                })
            })
        });
    }

    public toggleFavorite(bof, isFavorite) {

        this.bofs.find(item => {
            if (item.eventId === bof.eventId) {
                item.isFavorite = isFavorite;
                return true;
            }
            return false;
        });

        this.transformEvents(this.bofs).then(data => {
            this.bindChanges(data);
        }).then(() => {
            this._eventService.toggleFavorite(bof, 'bof');
            this.bofsChanged$.emit('changed');
        })
    }

    private inLevels(bof, levels) {
        var levelId = bof.experienceLevel;
        if (!Object.keys(levels).length) {
            return true;
        }

        if (levels && levels[levelId] == true) {
            return true;
        } else {
            return false;
        }
    }

    private inTracks(bof, tracks) {
        var trackId = bof.track;
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

        this.formattedBofs = data;
        this.dates = this.getDates(data);
        this.activeDate = this.activeDate || this.dates[0];
        if (changeActiveDate) {
            this.activeDate = this.dates[0];
        }
        this.activeBofs = this.formattedBofs[this.activeDate];
        this.hours = Object.keys(this.activeBofs);

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
