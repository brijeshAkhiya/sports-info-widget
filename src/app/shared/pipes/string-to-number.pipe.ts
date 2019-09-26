import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strTonumber'
})
export class StringtoNumberPipe implements PipeTransform {

    constructor() { }

    transform(value: any): any {
        if (value) {
            return Number(value);
        }
    }
}
