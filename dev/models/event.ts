import {Level} from "./level";
import {Track} from "./track";

export interface Event {
    eventId: number,
    text: string,
    name: string,
    place: string,
    version: string,
    experienceLevel: number,
    type: number,
    from: string,
    to: string,
    speakers: [number],
    track: number,
    order: number,
    link: string,
    event_type: string,
    deleted: boolean,
    isFavorite: boolean,
    levelObject?: Level,
    timeLabel?:string,
    trackObject?: Track,
}
