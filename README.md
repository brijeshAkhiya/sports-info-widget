# Hawk Eye Widget ID
Widget ID - 046d029afbaa353404d1b7a898dc5f0b


# SSR
1. ng add @nguniversal/express-engine --clientProject sports-web
2. Added Document, window, Element DOM APi reference on server side to avoid Compile error.

#  ReferenceError: Element is not defined
```
 const domino = require('domino');
 global['Element'] = domino.impl.Element; // etc
``` 
#  ReferenceError: window is not defined
```
 const fs = require('fs');
 const template = fs.readFileSync(join(process.cwd(), 'dist/browser/index.html')).toString();
 let win = domino.createWindow(template);
 global['window'] = win;
```

#  ReferenceError: document is not defined
``` global['document'] = win.document;```

3. Check in code if platform is browser while code is using DOM API like Document, window, Interval specially in app.component.ts
```# without SSR
#   window.scrollTo(0, 0); 
# With SSR
#   if (isPlatformBrowser(this.platformId))
#      window.scrollTo(0, 0);
```
4. Pass parameter from Server side to client side
# Server 
```
 app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    document: template,
    url: options.req.url,
    extraProviders: [
      // { provide: 'requestUrl', useFactory: () => options.req.url, deps: [] },    // 1. set up the provider for the url
      { provide: 'req', useFactory: () => options.req, deps: [] },    // 1. set up the provider for the url
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
 });
```

# Client- Angular
#  this.injector.get('req');

5. Server side i18n Translation
src/app/app.server.module.ts
```
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { readFileSync } from 'fs';

export function universalLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n_v2_5/${lang}.json`, 'utf8')));
        observer.complete();
      });
    }
  } as TranslateLoader;
}
```

@NgModule
TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useFactory: universalLoader }
})

6. Not repeat API calls to server and client
User Transfer State Service

References: for SSR
https://www.twilio.com/blog/faster-javascript-web-apps-angular-universal-transferstate-api-watchdog
https://www.twilio.com/blog/create-search-engine-friendly-internationalized-web-apps-angular-universal-ngx-translate
https://www.twilio.com/blog/angular-universal-javascript-node-js-aws-lambda
