import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from '@providers/common-service';

@Pipe({
  name: "logosurl"
})
export class LogosUrlPipe implements PipeTransform {

  constructor(public commonService: CommonService) {}

  transform(value: any,sport:any): any {
    if (value && sport == 'kabaddi' ) {
      return (
        `${this.commonService.s3Url}logos/kabaddi-${value}.svg`
      );
    }
    else{
      return (
        `${this.commonService.s3Url}logos/${value}.png`
      );
    } 
  }
}
