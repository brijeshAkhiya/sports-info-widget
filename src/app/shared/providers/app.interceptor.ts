import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from '@providers/common-service';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(        
        @Inject(PLATFORM_ID) private platformId: Object,
        private commonService: CommonService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
/*         //google maps api doesnt allow extra header params - Fix condition --->*/         
        if (!request.url.includes('maps.googleapis.com/maps/api') && isPlatformBrowser(this.platformId)) {
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
            })
        );
    }
}
