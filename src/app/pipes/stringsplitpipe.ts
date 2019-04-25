import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})

export class SplitPipe implements PipeTransform {

    transform(input: string): any {
        return (input.split(", ")).reverse().join(" ")
    }
}