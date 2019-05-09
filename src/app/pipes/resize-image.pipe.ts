import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resizeImage'
})
export class ResizeImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
    let sizes = {'s':"560x315", 'm':'1440x810', 'l': '1920x1080'};
    if(args[1] == 'url')
    // return "url(" + "https://d1ldsx0apuyt84.cloudfront.net/" + args[0] + "/" + value +")";
    return "url(" + "https://d1ldsx0apuyt84.cloudfront.net/" + sizes[args[0]] + "/" + value +")";
    else
      return "https://d1ldsx0apuyt84.cloudfront.net/" + sizes[args[0]] + "/" + value;
  }

}
