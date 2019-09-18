import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
/*         //google maps api doesnt allow extra header params - Fix condition --->
 */        if (!request.url.includes('maps.googleapis.com/maps/api')) {
            request = request.clone({
                setHeaders: {
                    Language: localStorage.getItem('userLng') ? localStorage.getItem('userLng') : null
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
