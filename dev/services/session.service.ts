import {Injectable} from "@angular/core";
import {EventService} from "./event.service";
import {EventEmitter} from "@angular/core";

declare var moment: any;

@Injectable()

export class SessionService {

    public sessions;
    public formatedSessions;
    public activeDate: string;
    public activeSessions;
    public dates;
    public hours;
    public sessionsChanged$:EventEmitter<string>;

    public constructor(private _eventService: EventService) {
        this.getSessions().then(sessions => {
            this.sessions = sessions;
            this.transformEvents(sessions).then(data => {
                this.formatedSessions = data;
                this.dates = this.getDates(data);
                this.activeDate = this.dates[0];
                this.activeSessions = this.formatedSessions[this.activeDate];
                this.hours = Object.keys(this.activeSessions);
            })
        });

        this.sessionsChanged$ = new EventEmitter();
    }

    public getSessions() {
        if (!this.sessions) {
            return this._eventService.getEventsByType('session').then((sessions) => {
                this.sessions = sessions;
                return sessions;
            });
        } else {
            return Promise.resolve(this.sessions);
        }
    }

    public setActiveDate(date) {
        this.activeDate = date;
        this.activeSessions = this.formatedSessions[this.activeDate];
        this.hours = Object.keys(this.activeSessions);
        this.sessionsChanged$.emit(date);
    }

    public getSession($id) {
        return this._eventService.getEvent($id, 'session');
    }

    public filterEvents(levels, tracks) {
        this.getSessions().then(sessions => {

            var promise = new Promise((resolve, reject) => {
                var filteredSessions = [];
                sessions.forEach(session => {
                    if (this.inLevels(session, levels) && this.inTracks(session, tracks)) {
                        filteredSessions.push(session);
                    }
                });
                resolve(filteredSessions);
            })

            promise.then(sessions => {
                this.transformEvents(sessions).then(data => {
                    this.formatedSessions = data;
                    this.dates = this.getDates(data);
                    this.activeDate = this.dates[0];
                    this.activeSessions = this.formatedSessions[this.activeDate];
                    this.hours = Object.keys(this.activeSessions);
                    this.sessionsChanged$.emit('changed');
                })
            })

        });

    }

    private inLevels(session, levels) {
        var levelId = session.experienceLevel;
        if (!Object.keys(levels).length) {
            return true;
        }

        if (levels && levels[levelId] == true) {
            return true;
        } else {
            return false;
        }

    }

    private inTracks(session, tracks) {
        var trackId = session.track;
        if (!Object.keys(tracks).length) {
            return true;
        }
        if (tracks && tracks[trackId] == true) {
            return true;
        } else {

            return false;
        }

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
        transformed.isFavorite = false; //@todo

        return transformed;
    }

    private getDates(data) {
        return Object.keys(data);
    }
}
