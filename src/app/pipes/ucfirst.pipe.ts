import {PipeTransform, Pipe} from "@angular/core";

@Pipe({
    name: 'ucfirst'
})

export class Ucfirst implements PipeTransform {
    transform(value:any, args:any):any {

        value = value.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter:string) {
            return letter.toUpperCase();
        });

        return value;
    }

}
