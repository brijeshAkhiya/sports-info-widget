import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from '@providers/common-service';



@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private commonService: CommonService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
/*         //google maps api doesnt allow extra header params - Fix condition --->
 */        if (!request.url.includes('maps.googleapis.com/maps/api')) {
            request = request.clone({
                setHeaders: {
                    Language: this.commonService.getFromStorage('userLng') ? this.commonService.getFromStorage('userLng') : null
                }
            });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
                return event;
            }));
    }
}
