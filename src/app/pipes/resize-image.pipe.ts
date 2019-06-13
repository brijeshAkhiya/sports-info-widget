import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from '@providers/common-service';

@Pipe({
  name: "resizeImage"
})
export class ResizeImagePipe implements PipeTransform {
  
  constructor(public commonService: CommonService) {}

  transform(value: any, args?: any): any {
    if(typeof value == 'undefined' || value == null)
      return value;
    // If im  age is direct http URL
    if(value != null && typeof value != 'undefined' && value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))
      return value;

    // if image has only source - append baseURL
    let sizes = { s: "560x315", m: "1440x810", l: "1920x1080" };
    if (args) {
      return (
        `${this.commonService.s3Url}${sizes[args]}/${value}`
      );
    } else {
      return `${this.commonService.s3Url}${value}`
    }
  }
}
