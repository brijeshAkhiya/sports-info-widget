import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringunder'
})

export class StringUnder implements PipeTransform {
    transform(input: string): any {
        if (input) {
            // return input.replace(/_/g, " ")
            return input.split("_").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
        }
    }
}