import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cricketScore'
})
export class CricketScorePipe implements PipeTransform {

  transform(input: string): any {
    if (input && input != "") {
      return (input.split('/')[1] == '10') ? input.split('/')[0] : input;
    } else {
      console.info("Input pipe value:- " + input);
    }
  }

}
