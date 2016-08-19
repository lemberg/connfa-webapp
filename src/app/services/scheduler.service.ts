import {Injectable, EventEmitter} from "@angular/core";
import {ApiService} from "./api.service";
import {TrackService} from "./track.service";
import {SpeakerService} from "./speaker.service";
import {LevelService} from "./level.service";
import {EventService} from "./event.service";
import {Speaker} from "../models/speaker";
import {Event} from "../models/event";
import {WindowService} from "./window.service";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {Level} from "../models/level";
import {Track} from "../models/track";

@Injectable()

export class SchedulerService {

    public schedulers:any = [];
    public activeEvents:any = [];
    public activeDate:any = '';
    public schedulersPromise:any = null;
    public formatted:any;
    public dates:any;
    public hours:any;
    public eventsChanged$:any;

    private _nonClickableTypes = [3, 4, 8, 9];

    public constructor(private _apiService:ApiService,
                       private _trackService:TrackService,
                       private _speakerService:SpeakerService,
                       private _levelService:LevelService,
                       private _eventService:EventService,
                       private _windowService:WindowService,
                       private _router:Router) {

        this.eventsChanged$ = new EventEmitter();

        this._apiService.dataChanged$.subscribe((data:any) => {
            this.schedulersPromise = null;
            this.schedulers = [];
            this.getSchedulers().then((data:any) => {
                this.eventsChanged$.emit(data);
            });
        });
    }

    public getSchedulers() {
        if (this.schedulersPromise !== null) {
            return this.schedulersPromise;
        }

        if (!this.schedulers || this.schedulers.length == 0) {

            return this.schedulersPromise = this._apiService.getCollection('events').then((events:Event[]) => {
                var favorites = events.filter((event:Event) => {
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

                this.schedulers = favorites;

                return this.transformEvents(favorites).then(events => {
                    this.bindChanges(events, true);
                });
            })
        } else {
            return Promise.resolve(this.schedulers);
        }
    }

    public getScheduler(id:number) {
        return this.getSchedulers().then((events:Event[]) => {
            var event = this.schedulers.filter((event:Event) => {
                return id == event.eventId;
            });
            return event[0];
        })
    }

    public setActiveDate(date:string, redirect:boolean = false) {
        this.activeDate = date;
        this.activeEvents = this.formatted[this.activeDate];
        if (redirect && this._windowService.isDesktop()) {
            var event = this._getFirstActiveEvent(this.activeEvents);
            this._router.navigate(['/scheduler/' + event.eventId]);
        }
        this.eventsChanged$.emit(date);
    }

    public toggleFavorite(event:Event, isFavorite:boolean) {

        this.schedulers.find((item:Event) => {
            if (item.eventId === event.eventId) {
                item.isFavorite = isFavorite;
                return true;
            }
            return false;
        });

        this.transformEvents(this.schedulers).then((data:any) => {
            this.bindChanges(data);
        }).then(() => {
            this._eventService.toggleFavorite(event, event.event_type);
            this.eventsChanged$.emit('changed');
        })
    }

    private bindChanges(data:any, changeActiveDate:boolean = false) {

        this.formatted = data;
        this.dates = this.getDates(data);
        this.activeDate = this.activeDate || this.dates[0];
        if (changeActiveDate) {
            this.activeDate = this.dates[0];
        }
        this.activeEvents = this.formatted[this.activeDate];
        // this.hours = Object.keys(this.activeEvents);
    }

    private _getFirstActiveEvent(activeEvents:any) {
        var firstCategory = Object.keys(activeEvents)[0];
        var firstHour = Object.keys(activeEvents[firstCategory])[0];
        var event = this.activeEvents[firstCategory][firstHour][0];

        return event;
    }

    private transformEvents(events: Event[]) {
        var transformed:any[] = [];
        return new Promise((resolve, reject) => {
            events.forEach((event:Event) => {
                var event_day = moment(event.from).format('ddd D');
                var event_hours = moment(event.from).format('LT') + ' ' + moment(event.to).format('LT');

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

    public isNonClickable(type:number) {
        return this._nonClickableTypes.indexOf(type) !== -1
    }

    private transform(item:Event) {

        if (item.experienceLevel) {
            this._levelService.getLevel(item.experienceLevel).then((level:Level)=> {
                item.levelObject = level;
            })
        }

        if (item.track) {
            this._trackService.getTrack(item.track).then((track:Track)=> {
                item.trackObject = track;
            })
        }

        item.timeLabel = moment(item.from, moment.ISO_8601).format('ddd, LT') + ' - ' + moment(item.to, moment.ISO_8601).format('ddd, LT');
        item.fromLabel = moment(item.from, moment.ISO_8601).format('LT');
        item.toLabel = moment(item.to, moment.ISO_8601).format('LT');

        item.href = false;
        if (!this.isNonClickable(item.type)) {
            item.href = true;
        }

        if (item.speakers) {
            item.speakersCollection = [];
            item.speakersNames = [];
            item.speakers.forEach((speakerId) => {
                this._speakerService.getSpeaker(speakerId).then((speaker:Speaker) => {
                    item.speakersCollection.push(speaker);
                    item.speakersNames.push(speaker.firstName + ' ' + speaker.lastName)
                })
            })
        }

        return item;
    }

    private getDates(data:any) {
        return Object.keys(data);
    }
}
