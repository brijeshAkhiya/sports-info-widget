import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import { renderModuleFactory } from '@angular/platform-server';


const AWS = require('aws-sdk');
AWS.config.update({ signatureVersion: 'v4', accessKeyId: 'AKIAV6VRMHPBNM35PK6N', secretAccessKey: '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', region: 'ap-south-1' });
const s3 = new AWS.S3();


/**
 * Changes Start
 */

// ReferenceError: Element is not defined
const domino = require('domino');
global['Element'] = domino.impl.Element; // etc

// ReferenceError: window is not defined
const fs = require('fs');
const template = fs.readFileSync(join(process.cwd(), 'dist/browser/index.html')).toString();
let win = domino.createWindow(template);
global['window'] = win;

// ReferenceError: document is not defined
global['document'] = win.document;
/**
 * Changes End
 */


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 5500;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));
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


app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('/sitemap.xml', (req, res) => {
  s3.getObject({ Bucket: 'sports.info', Key: 'xmls/sitemap.xml' }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return res.set('Content-Type', 'text/xml').send(data.Body);
    }
  });
});
app.get('/xmls/*', (req, res) => {
  while (req.url.charAt(0) === '/') {
    req.url = req.url.substr(1);
  }
  s3.getObject({ Bucket: 'sports.info', Key: req.url }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return res.set('Content-Type', 'text/xml').send(data.Body);
    }
  });
});

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
