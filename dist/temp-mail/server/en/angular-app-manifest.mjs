
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
    'index.csr.html': {size: 16310, hash: '3f5c404519b67f8ad84fba3b8acab73d2519800be7cca6fe79e5ae53a498bb7c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: '19782558ae9ec03ead83a04c79eb1fbfb9e1df38f622ee9e0e30f3a3e50c93f4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 53487, hash: '8d9b38cdaacaa4db88d5613c29e850793b9563fcfb8c575ac2d82cc3135708c1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-23CJ4ODI.css': {size: 34960, hash: 'qoGp9Vrwr0M', text: () => import('./assets-chunks/styles-23CJ4ODI_css.mjs').then(m => m.default)}
  },
};
