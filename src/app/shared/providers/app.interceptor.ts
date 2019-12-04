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
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private transferState: TransferState,
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
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const key: StateKey<string> = makeStateKey<string>(request.url);
        const storedResponse = this.transferState.get<any>(key, null);
        if (storedResponse) {
            if (!isPlatformServer(this.platformId)) this.transferState.remove(key);
            const response = new HttpResponse({ body: storedResponse, status: 200 });
            return of(response);
        } else {
            if (isPlatformServer(this.platformId)) {
                return next.handle(request).pipe(tap((event) => {
                    this.transferState.set(key, (<HttpResponse<any>>event).body);
                }));
            } else {
                return next.handle(request);
            }
        }



        // if (isPlatformServer(this.platformId)) {
        //     return next.handle(request).pipe(tap((event) => {
        //         console.log('request')
        //         console.log(key)
        //         // console.log((<HttpResponse<any>>event).body)
        //         this.transferState.set(key, (<HttpResponse<any>>event).body);
        //     }));
        // } else {
        //     const storedResponse = this.transferState.get<any>(key, null);
        //     console.log('response');
        //     console.log(key);
        //     // console.log(storedResponse)
        //     if (storedResponse) {
        //         const response = new HttpResponse({ body: storedResponse, status: 200 });
        //         this.transferState.remove(key);
        //         return of(response);
        //     } else {
        //         return next.handle(request);
        //     }
        // }
        // return next.handle(request).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {

        //         }
        //         return event;
        //     })
        // );
    }





}
