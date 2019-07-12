import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitID'
})

export class StringsplitID implements PipeTransform {
    transform(input: string): any {
        if (input) {            
            return input.split(':')[2]
        }
    }
}