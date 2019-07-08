import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringunder'
})

export class StringUnder implements PipeTransform {
    transform(input: string, args?: any): any {
        if (input) {
            if (args)
                return input.split(args).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
            else
                return input.split("_").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
        }
    }
}