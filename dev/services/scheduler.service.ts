import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {TrackService} from "./track.service";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";

declare var moment:any;

@Injectable()

export class SchedulerService {

    public schedulers = [];
    public activeEvents = [];
    public activeDate = '';
    public schedulersPromise = null;
    public formatted;
    public dates;
    public hours;

    public constructor(private _apiService:ApiService,
                       private _trackService:TrackService,
                       private _speakerService:SpeakerService,
                       private _levelService:LevelService) {
    }

    public getSchedulers() {
        if (this.schedulersPromise !== null) {
            return this.schedulersPromise;
        }

        if (!this.schedulers || this.schedulers.length == 0) {

            return this.schedulersPromise = this._apiService.getCollection('events').then(events => {
                var favorites = events.filter(function (event) {
                    return event.isFavorite == true;
                }).sort((a, b) => {
                    var first = moment(a.from).format('x');
                    var second = moment(b.from).format('x');

                    if (first < second) {
                        return -1;
                    } else if (first > second) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                return this.transformEvents(favorites).then(events => {
                    this.bindChanges(events, true);
                });
            })
        } else {
            return Promise.resolve(this.schedulers);
        }
    }

    public setActiveDate(date) {
        this.activeDate = date;
        this.activeEvents = this.formatted[this.activeDate];
        // this.hours = Object.keys(this.activeEvents);
        // this.sessionsChanged$.emit(date);
    }

    private bindChanges(data, changeActiveDate = false) {

        this.formatted = data;
        this.dates = this.getDates(data);
        this.activeDate = this.activeDate || this.dates[0];
        if (changeActiveDate) {
            this.activeDate = this.dates[0];
        }
        this.activeEvents = this.formatted[this.activeDate];
        // this.hours = Object.keys(this.activeEvents);
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

                if (!transformed[event_day][event.event_type]) {
                    transformed[event_day][event.event_type] = [];
                }

                if (!transformed[event_day][event.event_type][event_hours]) {
                    transformed[event_day][event.event_type][event_hours] = [];
                }

                transformed[event_day][event.event_type][event_hours].push(this.transform(event));
            });

            return resolve(transformed);
        });
    }

    private transform(item) {

        if (item.experienceLevel) {
            this._levelService.getLevel(item.experienceLevel).then(level => {
                item.levelObject = level;
            })
        }

        if (item.track) {
            this._trackService.getTrack(item.track).then(track => {
                item.trackObject = track;
            })
        }

        if (item.speakers) {
            item.speakersCollection = [];
            item.speakersNames = [];
            item.speakers.forEach((speakerId) => {
                this._speakerService.getSpeaker(speakerId).then(speaker => {
                    item.speakersCollection.push(speaker);
                    item.speakersNames.push(speaker.firstName + ' ' + speaker.lastName)
                })
            })
        }

        return item;
    }

    private getDates(data) {
        return Object.keys(data);
    }
}
