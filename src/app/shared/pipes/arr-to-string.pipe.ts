import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrToString'
})
export class ArrToStringPipe implements PipeTransform {

  transform(arr: any, key?: any): any {
    key = key.split('.');
    let value = arr[key[0]];
    for (let i = 1; i < key.length; i++) {
      value = value[key[i]];
    }
    return value !== undefined ? value : 0;
  }

}
