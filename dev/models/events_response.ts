import {Event} from "./event";
export interface EventsResponse {
    days:[{
        events:Event[],
        day:string
    }],
}
