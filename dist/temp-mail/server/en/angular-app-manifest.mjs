
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/en/',
  locale: "en",
  routes: [
  {
    "renderMode": 2,
    "route": "/en"
  },
  {
    "renderMode": 0,
    "route": "/en/saved/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/en",
    "route": "/en/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 15185, hash: 'e11819f52cff66918e2b0797a3af289b69ef3dc235e41d8e3836ad46fc3d9ba2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: '0e2c0fc1fdb1447c52a6a69c791e95b075024d13e09ed5ca566f262f45181843', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 52301, hash: '969e6014af1cab2d084cd65549949b7597be8f1672b5dbe3de53566b9b1fe51b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QTTAX6IE.css': {size: 32946, hash: 'CfZy4GHdbY0', text: () => import('./assets-chunks/styles-QTTAX6IE_css.mjs').then(m => m.default)}
  },
};
