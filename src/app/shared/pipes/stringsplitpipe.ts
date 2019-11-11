import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})

export class SplitPipe implements PipeTransform {

    transform(input: string): any {
        if (typeof input == 'undefined' || input == null)
            return '';
        if (input.includes('/')) {
            let splitInput = input.split('/');
            return splitInput[0].split(', ').reverse().join(' ') + '/' + splitInput[1].split(', ').reverse().join(' ');
        }
        return (input.split(', ')).reverse().join(' ');
    }
}
