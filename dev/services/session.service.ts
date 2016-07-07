import {Injectable} from "@angular/core";
import {EventService} from "./event.service";
import {EventEmitter} from "@angular/core";

declare var moment: any;

@Injectable()

export class SessionService{

    public sessions;
    public formattedSessions;
    public dates;
    public activeDate;
    public activeSessions;
    public hours;
    public sessionsChanged$;

    private sessionsPromise = null;


    public constructor(private _eventService: EventService) {
        this.sessionsChanged$ = new EventEmitter();
    }

    public getSessions() {
        if (this.sessionsPromise !== null) {
            return this.sessionsPromise;
        }
        console.log('promise null');

        if (!this.sessions) {

            return this.sessionsPromise = this._eventService.init().then(sessions => {
                console.log('in getSessions Promise');


                return new Promise((resolve, reject) => {
                    this.sessions = sessions;

                    this.transformEvents(sessions).then(data => {
                        this.bindChanges(data);
                        resolve();
                    })
                })
            });
        } else {
            return Promise.resolve(this.sessions);
        }
    }

    public getSession(id) {
        return this.getSessions().then(sessions => {
            var session = this.sessions.filter((session) => {
                  return id == session.eventId;
            });

            return session[0];
        })
    }


    public setActiveDate(date) {
        this.activeDate = date;
        this.activeSessions = this.formattedSessions[this.activeDate];
        this.hours = Object.keys(this.activeSessions);
        this.sessionsChanged$.emit(date);
    }

    public filterEvents(levels, tracks) {
        this.getSessions().then(sessions => {

            var promise = new Promise((resolve, reject) => {
                var filteredSessions = [];
                this.sessions.forEach(session => {
                    if (this.inLevels(session, levels) && this.inTracks(session, tracks)) {
                        filteredSessions.push(session);
                    }
                });
                resolve(filteredSessions);
            })

            promise.then(sessions => {
                this.transformEvents(sessions).then(data => {
                    this.bindChanges(data, true);
                    this.sessionsChanged$.emit('adsasd');
                })
            })
        });
    }

    public toggleFavorite(session, isFavorite) {

        this.sessions.find(item => {
            if (item.eventId === session.eventId) {
                item.isFavorite = isFavorite;
                return true;
            }
            return false;
        });

        this.transformEvents(this.sessions).then(data => {
            this.bindChanges(data);
        }).then(() => {
            this._eventService.toggleFavorite(session, 'session');
            this.sessionsChanged$.emit('changed');
        })
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

    private bindChanges(data, changeActiveDate = false) {

        this.formattedSessions = data;
        this.dates = this.getDates(data);
        this.activeDate = this.activeDate || this.dates[0];
        if (changeActiveDate) {
            this.activeDate = this.dates[0];
        }
        this.activeSessions = this.formattedSessions[this.activeDate];
        this.hours = Object.keys(this.activeSessions);

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
