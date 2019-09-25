import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateparse'
})
export class DateParsePipe implements PipeTransform {

    constructor() { }

    transform(value: any): any {
        if (value) {
            return value.replace(/\s/g, 'T');
        }
    }
}
