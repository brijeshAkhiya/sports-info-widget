import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "logosurl"
})
export class LogosUrlPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      return (
        "https://d1ldsx0apuyt84.cloudfront.net/logos/" + value + ".png" 
      );
    } 
  }
}
