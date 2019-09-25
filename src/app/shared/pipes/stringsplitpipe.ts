import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})

export class SplitPipe implements PipeTransform {

    transform(input: string): any {
        if (typeof input == 'undefined' || input == null)
            return '';
        return (input.split(', ')).reverse().join(' ');
    }
}
