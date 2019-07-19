import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from '@providers/common-service';

@Pipe({
    name: "dateparse"
})
export class DateParsePipe implements PipeTransform {

    constructor(public commonService: CommonService) { }

    transform(value: any): any {
        if (value) {
            return value.replace(/\s/g, "T");
        }
    }
}
