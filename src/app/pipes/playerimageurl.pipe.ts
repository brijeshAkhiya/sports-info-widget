import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from "@providers/common-service";

@Pipe({
  name: "playerimage"
})
export class PlayerImagePipe implements PipeTransform {
  constructor(public commonService: CommonService) {}

  transform(value: any, args?: any): any {
    let sizes = { s: "560x315", m: "452x544", l: "1920x1080" };
    if (args) {
      return `${this.commonService.s3Url}/${sizes[args]}/players/${value}.jpg`;
    } else {
      return `${this.commonService.s3Url}${value}.jpg`;
    }
  }
}
