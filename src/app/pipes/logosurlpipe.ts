import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from '@providers/common-service';

@Pipe({
  name: "logosurl"
})
export class LogosUrlPipe implements PipeTransform {

  constructor(public commonService: CommonService) {}

  transform(value: any): any {
    if (value) {
      return (
        `${this.commonService.s3Url}logos/${value}.png`
      );
    } 
  }
}
