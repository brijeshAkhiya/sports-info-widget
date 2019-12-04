import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { readFileSync } from 'fs';
import { AppInterceptor } from './shared/providers/app.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { TranslateServerLoader } from './translate-server-loader.service';
let english = require('../assets/i18n_v2_5/english.json');
let arabic = require('../assets/i18n_v2_5/arabic.json');
let bengali = require('../assets/i18n_v2_5/bengali.json');
let temp = require('../assets/i18n_v2_5/temp.json');

// const english = JSON.parse(readFileSync(`./dist/browser/assets/i18n_v2_5/english.json`, 'utf8'));
let languages = { 'english': english, 'arabic': arabic, 'bengali': bengali, 'temp': temp };

export function universalLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        observer.next(languages[lang]);
        observer.complete();
      });
    }
  } as TranslateLoader;
}
export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n_v2_5', '.json', transferState);
}


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      // loader: { provide: TranslateLoader, useFactory: universalLoader }
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [TransferState]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
