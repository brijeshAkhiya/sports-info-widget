import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cricketScore'
})
export class CricketScorePipe implements PipeTransform {

  transform(input: string): any {
    if (typeof input != 'undefined' && input != null && typeof input != 'object') {
      return (input.split('/')[1] == '10') ? input.split('/')[0] : input;
    }
  }

}
