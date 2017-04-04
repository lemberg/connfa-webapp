import {SafeHtml} from "@angular/platform-browser";
export interface Page {
    infoId: number,
    infoTitle: string,
    html: string,
    order: number,
    deleted: boolean,
    sanitizedHtml: SafeHtml,
}
