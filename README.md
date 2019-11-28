# Hawk Eye Widget ID
Widget ID - 046d029afbaa353404d1b7a898dc5f0b


# SSR
1. ng add @nguniversal/express-engine --clientProject sports-web
2. Added Document, window, Element DOM APi reference on server side to avoid Compile error.

# // ReferenceError: Element is not defined
# const domino = require('domino');
# global['Element'] = domino.impl.Element; // etc
# 
# // ReferenceError: window is not defined
# const fs = require('fs');
# const template = fs.readFileSync(join(process.cwd(), 'dist/browser/index.html')).toString();
# let win = domino.createWindow(template);
# global['window'] = win;
# 
# // ReferenceError: document is not defined
# global['document'] = win.document;

3. Check in code if platform is browser while code is using DOM API like Document, window, Interval specially in app.component.ts
# without SSR
#   window.scrollTo(0, 0); 
# With SSR
#   if (isPlatformBrowser(this.platformId))
#      window.scrollTo(0, 0);

4. Pass parameter from Server side to client side
# Server 
# app.engine('html', (_, options, callback) => {
#  renderModuleFactory(AppServerModuleNgFactory, {
#    document: template,
#    url: options.req.url,
#    extraProviders: [
#      // { provide: 'requestUrl', useFactory: () => options.req.url, deps: [] },    // 1. set up the provider for the url
#      { provide: 'req', useFactory: () => options.req, deps: [] },    // 1. set up the provider for the url
#      provideModuleMap(LAZY_MODULE_MAP)
#    ]
#  }).then(html => {
#    callback(null, html);
#  });
# });

# Client- Angular
#  this.injector.get('req');