if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>n(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-e13f827e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-build-manifest.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/server/middleware-react-loadable-manifest.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/TgSDfX-TlQSXpe806yno_/_buildManifest.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/TgSDfX-TlQSXpe806yno_/_ssgManifest.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/196-fd1f1f691a8cda4d.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/228-ae9e7acea042b2af.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/61-8dfeb970a786fa27.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/653-25a64db4f16c43d0.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/ae51ba48-d97b97f7ea7977f1.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/framework-7751730b10fa0f74.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/main-51093b92f1af8206.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/_app-fb3a09296bceae8f.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/_error-e4f561a102d9bb14.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/about-a6c7a8cdf6a98fba.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/blog-25888bac13c5fae0.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/blog/%5Bid%5D-a6a4ad9ef6049940.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/history-0b905bb37e1421fd.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/home-201949b5611a7be6.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/index-21dda5fbecebf248.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/login-a2af8deae11a1d13.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/notes-96046b6ced8a07d1.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/pages/register-c7a81a3efac4d2cd.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/2c12a861c836e296.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/7567d22ea1fb38ca.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/8bc3deff0b43b9f6.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/da4b44927cb6abab.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/db856676a68b8980.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/_next/static/css/ea3dc584b5be8e6c.css",revision:"TgSDfX-TlQSXpe806yno_"},{url:"/favicon.ico",revision:"1ad1e0dc69b3f0e41d33718bd3fa09b3"},{url:"/favicon.png",revision:"906bb7d132b2f9dabca8c9d7922c113e"},{url:"/icon-192x192.png",revision:"293b5c282b4905691eed602fc4593d82"},{url:"/icon-256x256.png",revision:"0c319d31f9d6cbbd3c0fdf0e88fcdd0e"},{url:"/icon-384x384.png",revision:"4795c1c13099c3313173d4c4ac93a160"},{url:"/icon-512x512.png",revision:"67f30d4374a5be50b0f05421ffd097ba"},{url:"/images/dashboard.png",revision:"af585ef03c3f385ad9c729c465ae8625"},{url:"/images/deadpool.svg",revision:"2b78e314ef74f0cd9bacf28a978659f3"},{url:"/images/ic_arrow.svg",revision:"4bba43ae4e94d5f7fb752b361ceb397f"},{url:"/images/ic_book.svg",revision:"eed0f0d07bc4590cee15233d14c49b30"},{url:"/images/ic_calendar.svg",revision:"8a941ca2e2ab02198805b22c50466869"},{url:"/images/ic_chart.svg",revision:"21cf2abcad3c7bd3216361aa20b06831"},{url:"/images/ic_google.svg",revision:"686f8efa6e3e28e96d1c08399e8d353d"},{url:"/images/logo.png",revision:"906bb7d132b2f9dabca8c9d7922c113e"},{url:"/manifest.json",revision:"a02719425bd0061be524bb283fe7f9bc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-327c579b'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
