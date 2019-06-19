import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from '@providers/common-service';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: "safehtml"
})
export class SafehtmlPipe implements PipeTransform {

  constructor(public commonService: CommonService,private domsanitizer:DomSanitizer) {}

  transform(value: any): any {
    if (value) {
      return this.domsanitizer.bypassSecurityTrustHtml(value);
    } 
  }
}
