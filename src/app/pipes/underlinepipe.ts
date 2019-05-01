import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringunder'
})

export class StringUnder implements PipeTransform {

    transform(input: string): any {
        
        return input.replace(/_/g," ")
    }
}