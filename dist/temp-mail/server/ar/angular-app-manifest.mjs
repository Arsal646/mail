
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ar/',
  locale: "ar",
  routes: [
  {
    "renderMode": 2,
    "route": "/ar"
  },
  {
    "renderMode": 0,
    "route": "/ar/saved/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ar",
    "route": "/ar/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 15185, hash: '772b175cc4606e7bc65df1c86612ac614a5997d8c712d6e1ba07f88fb63ba09d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3127, hash: '1195bf4ec30cfcc5226ec72745be62341f8a4777515dbb01402dfba0a4ec1794', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 55731, hash: '615b72779f44892294f05a923f82eab4b27eb4cd6c8f89f1a25733817bd0eef1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QTTAX6IE.css': {size: 32946, hash: 'CfZy4GHdbY0', text: () => import('./assets-chunks/styles-QTTAX6IE_css.mjs').then(m => m.default)}
  },
};
